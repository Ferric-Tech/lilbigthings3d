// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
import admin = require('firebase-admin');
admin.initializeApp();

import crypto = require('crypto');
import dns = require('dns');
import axios from 'axios';

exports.processPaymentNotification = functions.https.onRequest(
  async (req, res) => {
    const pfValidPaymentData = (
      cartTotal: string,
      pfData: { [x: string]: string }
    ) => {
      return (
        Math.abs(parseFloat(cartTotal) - parseFloat(pfData['amount_gross'])) <=
        0.01
      );
    };

    const pfValidServerConfirmation = async (
      pfHost: unknown,
      pfParamString: unknown
    ) => {
      const result = await axios
        .post(`https://${pfHost}/eng/query/validate`, pfParamString)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      return result === 'VALID';
    };

    const testingMode = true;
    const passPhrase = testingMode ? 'SaltAndPepperPig' : 'ThisIsThe1AndOnly'; // Testing
    const pfHost = testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

    const paymentNotificationContent = req.body;

    const cartTotal = paymentNotificationContent['amount_gross'];
    const paramString = generateParamString(paymentNotificationContent);

    const isValidSignature = isValidSignatureCheck(
      paymentNotificationContent,
      paramString,
      passPhrase
    );
    const isValidIP = await isValidIPCheck(req);
    const check3 = pfValidPaymentData(cartTotal, paymentNotificationContent);
    const check4 = pfValidServerConfirmation(pfHost, paramString);

    if (isValidSignature && isValidIP && check3 && (await check4)) {
      // Push the new message into Firestore using the Firebase Admin SDK.
      paymentNotificationContent['matched'] = true;
      // Send back a message that we've successfully written the message
    } else {
      paymentNotificationContent['matched'] = false;
    }

    const writeResult = await admin
      .firestore()
      .collection('payment-notifications')
      .add(paymentNotificationContent);
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  }
);

function generateParamString(
  paymentNotificationContent: Record<string, string>
): string {
  let returnString = '';
  for (const key in paymentNotificationContent) {
    if (key in paymentNotificationContent && key !== 'signature') {
      returnString += `${key}=${encodeURIComponent(
        paymentNotificationContent[key].trim()
      ).replace(/%20/g, '+')}&`;
    }
  }
  // Remove last ampersand
  returnString = returnString.slice(0, -1);
  return returnString;
}

function isValidSignatureCheck(
  paymentNotificationContent: Record<string, string>,
  paramString: string,
  passphrase: string | null = null
): boolean {
  // Calculate security signature
  //   const tempParamString = '';
  if (passphrase !== null) {
    paramString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(
      /%20/g,
      '+'
    )}`;
  }

  const signature = crypto.createHash('md5').update(paramString).digest('hex');
  return paymentNotificationContent['signature'] === signature;
}

async function ipLookup(domain: string): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    dns.lookup(
      domain,
      { all: true },
      (err: unknown, address: { address: unknown }[]) => {
        if (err) {
          reject(err);
        } else {
          const addressIps = address.map(function (item: { address: unknown }) {
            return item.address;
          });
          resolve(addressIps);
        }
      }
    );
  });
}

async function isValidIPCheck(req: functions.https.Request): Promise<boolean> {
  const validHosts = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za',
  ];

  let validIps: Iterable<unknown> | null | undefined = [];
  const pfIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    for (const key in validHosts) {
      const ips = await ipLookup(validHosts[key]);
      validIps = [...validIps, ...ips];
    }
  } catch (err) {
    console.error(err);
  }

  const uniqueIps = [...new Set(validIps)];

  if (uniqueIps.includes(pfIp)) {
    return true;
  }
  return false;
}
