import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';

// Initialize the Firebase Admin SDK
const firebaseConfigForSubAdmin = {
  apiKey: "AIzaSyCo6n1XgZHAfqgagXzybco6Sy6WDc7vQ7s",
  authDomain: "newsapp-cc357.firebaseapp.com",
  projectId: "newsapp-cc357",
  storageBucket: "newsapp-cc357.appspot.com",
  messagingSenderId: "902184640546",
  appId: "1:902184640546:web:42fa52c667771f9b7bea7b"
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
