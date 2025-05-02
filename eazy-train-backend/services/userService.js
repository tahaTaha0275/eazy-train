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
 *
 * @param {Object} userData - The data for the new user.
 * @param {string} userData.name - Name of the user.
 * @param {string} userData.email - Email address.
 * @param {string} userData.password - User's password.
 * @param {string} userData.role - User role: "passenger", "operator", or "admin".
 *
 * @returns {Promise<Object>} The newly created user document with its ID.
 * @throws {Error} If validation fails or Firestore write fails.
 */
async function createUser(userId, userData) {
  const { name, email, password, role } = userData;

  if (!userId|| !email || !password || !role) {
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
 *
 * @param {string} userId - The Firestore document ID of the user.
 * @returns {Promise<Object>} The user document data.
 * @throws {Error} If the user doesn't exist.
 */
async function getUserById(userId) {
  const doc = await db.collection('users').doc(userId).get();

  if (!doc.exists) {
    throw new Error('User not found.');
  }

  return { id: doc.id, ...doc.data() };
}

/**
 * Checks if a user exists by username (email).
 *
 * @param {string} email - The email of the user to check.
 * @returns {Promise<boolean>} True if user exists, false otherwise.
 */
async function userExistsByEmail(email) {
  const querySnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
  return !querySnapshot.empty;
}

/**
 * Checks if a user exists by email and password.
 *
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<Object|null>} The user object if found, null otherwise.
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

export { createUser, getUserById, userExistsByEmail, findUserByEmailAndPassword };