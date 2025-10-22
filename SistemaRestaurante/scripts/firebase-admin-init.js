// Helper to initialize Firebase Admin SDK for Node scripts
// Usage:
//  - If GOOGLE_APPLICATION_CREDENTIALS env var is set, it will use that file.
//  - Otherwise it will try to load ./credentials/google-service-account.json
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

function initFirebaseAdmin() {
  let serviceAccount;
  const envPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const fallbackPath = path.join(
    __dirname,
    '..',
    'credentials',
    'google-service-account.json'
  );

  if (envPath && fs.existsSync(envPath)) {
    serviceAccount = require(envPath);
  } else if (fs.existsSync(fallbackPath)) {
    serviceAccount = require(fallbackPath);
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    // decode base64 string and parse
    const json = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      'base64'
    ).toString('utf8');
    serviceAccount = JSON.parse(json);
  } else {
    throw new Error(
      'No Firebase service account found. Set GOOGLE_APPLICATION_CREDENTIALS, provide credentials/google-service-account.json or set FIREBASE_SERVICE_ACCOUNT_BASE64'
    );
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin;
}

module.exports = initFirebaseAdmin;
