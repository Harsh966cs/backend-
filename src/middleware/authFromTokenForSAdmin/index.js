import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

import dotenv from "dotenv";
import { initializeApp } from "firebase/app";

dotenv.config();
// Initialize the Firebase Admin SDK
const firebaseConfigForSubAdmin = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};


const a =  initializeApp({
    credential: admin.credential.applicationDefault(),
    ...firebaseConfigForSubAdmin
  },'SubAdmin');


const auth = getAuth(a);

const authentication = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).send({ message: 'Unauthorized Header. Access Denied' });
  }

  const token = header.substring(7, header.length);

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized Header. Access Denied' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.headers.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({      message: 'You are not SubAdmin or wrong authorization',error:error });
  }
};

export default authentication;

