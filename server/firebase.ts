// @ts-nocheck
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import serviceAccount from "./service_account.json";

//users and permissions in firestore, service accounts, generate new private key
//service_account.json add to structure (gitignore)

//firebase app
const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export { db };
