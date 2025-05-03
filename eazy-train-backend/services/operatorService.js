import admin from '../utils/firebaseAdmin.js'; // Import the initialized Firebase Admin SDK
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const db = getFirestore();
/**
 * Retrieves all users with role "operator".
 * 
 * @returns {Promise<Array>} List of operator objects
 */
async function getAllOperators() {
  const snapshot = await db
    .collection('users')
    .where('role', '==', 'operator')
    .get();

  const operators = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return operators;
}

// create operators with validation
// services/operatorService.js


/**
 * Creates a new operator in the users collection.
 * 
 * @param {Object} data - Operator fields from request body
 * @returns {Promise<Object>} - Newly created operator with Firestore ID
 */
async function createOperator(data) {
  const requiredFields = ['name', 'email', 'password', 'role'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  const operator = {
    name: data.name,
    email: data.email,
    password: data.password,
    age: Number(data.age) || 0,
    gender: data.gender || '',
    nationalID: data.nationalID || '',
    nationality: data.nationality || '',
    phone: data.phone || '',
    role: 'operator',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };

  const docRef = await db.collection('users').add(operator);
  return { id: docRef.id, ...operator };
}

// delete operator by id
async function deleteOperator(id) {
  const operatorRef = db.collection('users').doc(id);
  await operatorRef.delete();
  return { message: 'Operator deleted successfully' };
}

// PUT operator by id
async function updateOperator(id, data) {
  const operatorRef = db.collection('users').doc(id);
  await operatorRef.update(data);
  return { message: 'Operator updated successfully' };
}



export {
  getAllOperators,
  createOperator,
  deleteOperator,
  updateOperator
};
