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
    // Grab the text parameter.
    const notification = req.body;
    let pfParamString = '';
    const passPhrase = 'SaltAndPepperPig'; // Testing
    const cartTotal = notification['amount_gross'];
    const testingMode = true;
    const pfHost = testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';

    for (const key in notification) {
      if (key in notification && key !== 'signature') {
        pfParamString += `${key}=${encodeURIComponent(
          notification[key].trim()
        ).replace(/%20/g, '+')}&`;
      }
    }

    // Remove last ampersand
    pfParamString = pfParamString.slice(0, -1);

    const pfValidSignature = (
      notification: Record<string, unknown>,
      pfParamString: string,
      pfPassphrase: string | null = null
    ) => {
      // Calculate security signature
      const tempParamString = '';
      if (pfPassphrase !== null) {
        pfParamString += `&passphrase=${encodeURIComponent(
          pfPassphrase.trim()
        ).replace(/%20/g, '+')}`;
      }

      const signature = crypto
        .createHash('md5')
        .update(pfParamString)
        .digest('hex');
      return notification['signature'] === signature;
    };

    async function ipLookup(domain: string): Promise<unknown[]> {
      return new Promise((resolve, reject) => {
        dns.lookup(
          domain,
          { all: true },
          (err: unknown, address: { address: unknown }[]) => {
            if (err) {
              reject(err);
            } else {
              const addressIps = address.map(function (item: {
                address: unknown;
              }) {
                return item.address;
              });
              resolve(addressIps);
            }
          }
        );
      });
    }

    const pfValidIP = async (req: functions.https.Request) => {
      const validHosts = [
        'www.payfast.co.za',
        'sandbox.payfast.co.za',
        'w1w.payfast.co.za',
        'w2w.payfast.co.za',
      ];

      let validIps: Iterable<unknown> | null | undefined = [];
      const pfIp =
        req.headers['x-forwarded-for'] || req.connection.remoteAddress;

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
    };

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

    const check1 = pfValidSignature(notification, pfParamString, passPhrase);
    const check2 = pfValidIP(req);
    const check3 = pfValidPaymentData(cartTotal, notification);
    const check4 = pfValidServerConfirmation(pfHost, pfParamString);

    if (check1 && (await check2) && check3 && (await check4)) {
      // Push the new message into Firestore using the Firebase Admin SDK.
      const writeResult = await admin
        .firestore()
        .collection('payment-notifications')
        .add(notification);
      // Send back a message that we've successfully written the message
      res.json({ result: `Message with ID: ${writeResult.id} added.` });
    } else {
      // Some checks have failed, check payment manually and log for investigation
    }
  }
);
