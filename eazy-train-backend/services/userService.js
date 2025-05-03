// firestore/usersController.js
import admin from '../utils/firebaseAdmin.js';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

/**
 * Valid user roles
 */
const VALID_ROLES = ['passenger', 'operator', 'admin'];

/**
 * Creates a new user in Firestore.
 */
async function createUser(userId, userData) {
  const { name, email, password, role } = userData;

  if (!userId || !email || !password || !role) {
    throw new Error('Missing required user fields.');
  }

  if (!VALID_ROLES.includes(role)) {
    throw new Error('Invalid user role.');
  }

  const data = {
    name,
    email,
    password,
    role,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('users').doc(userId).set(data);
  return { id: userId, ...data };
}

/**
 * Retrieves a user by document ID.
 */
async function getUserById(userId) {
  const doc = await db.collection('users').doc(userId).get();

  if (!doc.exists) {
    throw new Error('User not found.');
  }

  return { id: doc.id, ...doc.data() };
}

/**
 * Checks if a user exists by email.
 */
async function userExistsByEmail(email) {
  const querySnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
  return !querySnapshot.empty;
}

/**
 * Finds user by email and password.
 */
async function findUserByEmailAndPassword(email, password) {
  const querySnapshot = await db.collection('users')
    .where('email', '==', email)
    .where('password', '==', password)
    .limit(1)
    .get();

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

/**
 * Updates a user document by ID.
 */
async function updateUserById(userId, updates) {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error('User not found.');
  }

  const allowedFields = ['name', 'email', 'password', 'role', 'nationalID', 'nationality', 'age', 'gender', 'phone'];
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key))
  );

  filteredUpdates.updatedAt = admin.firestore.FieldValue.serverTimestamp();

  await userRef.update(filteredUpdates);

  const updatedDoc = await userRef.get();
  return { id: userId, ...updatedDoc.data() };
}

async function getUserPhoneById(userId) {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error('User not found');
  }

  const data = userDoc.data();
  return data.phone || null;
}

export {
  createUser,
  getUserById,
  userExistsByEmail,
  findUserByEmailAndPassword,
  updateUserById,
  getUserPhoneById
};
