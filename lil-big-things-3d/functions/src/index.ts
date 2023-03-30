/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// How to write functions accross multiple files:
// https://firebase.google.com/docs/functions/organize-functions#write_functions_in_multiple_files

const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

const paymentNotificationsModule = require('./modules/payment-notifications');

exports.processPaymentNotification =
  paymentNotificationsModule.processPaymentNotification;
