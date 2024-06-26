import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';

// Initialize the Firebase Admin SDK
const firebaseConfigForAdmin = {
  apiKey: "AIzaSyDeBBDpT5r4iz3s5kz5MUjQgj3F5V8H1GI",
  authDomain: "blogwebsite-8f73f.firebaseapp.com",
  projectId: "blogwebsite-8f73f",
  storageBucket: "blogwebsite-8f73f.appspot.com",
  messagingSenderId: "763093824007",
  appId: "1:763093824007:web:105d21cba90f3e0511b0a2",
  measurementId: "G-C0JKW6PVFR"
};

if (!admin.apps.length) {
  initializeApp({
    credential: admin.credential.applicationDefault(),
    ...firebaseConfigForAdmin
  });
}

const auth = getAuth();

// Middleware for authentication
const authentication = async (req, res, next) => {
  const header = req.headers.authorization;
  console.log(header);

  if (!header || !header.startsWith("Bearer ")) {
    const statusMessage = 'Unauthorized Header. Access Denied';
    return res.status(401).send({ message: statusMessage });
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
    console.log(error);
    res.status(401).send({ message: 'You are not SubAdmin or wrong authorization',error:error});
  }
};

export default authentication;
