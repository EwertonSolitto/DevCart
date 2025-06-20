import { doc, collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { auth, db } from '../services//firebaseConfig';
import { Order } from '../models/Order';

export const saveOrderToFirestore = async (order: Order) => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const userOrdersRef = collection(doc(db, 'users', uid), 'orders');

  await addDoc(userOrdersRef, {
    ...order,
    createdAt: Timestamp.now(),
  });
};

export const getOrderHistory = async (): Promise<Order[]> => {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];

  const userOrdersRef = collection(doc(db, 'users', uid), 'orders');
  const snapshot = await getDocs(userOrdersRef);

  const orders = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return orders;
};
