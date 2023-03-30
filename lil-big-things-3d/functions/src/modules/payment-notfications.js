import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.processPaymentNotification = functions.https.onRequest(
  async (req, res => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    corsHandler(req, res, async () => {
      try {
        await admin.firestore().collection('payment-notications').add(req.body)
      } catch (err) {
        res.send(JSON.stringify('This is a mess' + err));
      }
    });
  }
))
