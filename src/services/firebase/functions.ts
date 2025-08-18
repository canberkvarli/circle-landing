import { db } from './config';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getWaitlistConfirmationEmail } from "@/utils/emailTemplates"

export interface WaitlistUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timestamp: Timestamp | null;
  status: 'waitlist' | 'invited' | 'active';
  inviteSent?: boolean;
  inviteDate?: Timestamp | null;
}

export const addWaitlistUser = async (userData: Omit<WaitlistUser, 'timestamp' | 'status'>) => {
  try {
    // Validate required fields
    if (!userData.firstName || !userData.email || !userData.phone) {
      return { success: false, error: 'Missing required fields' };
    }

    const docRef = await addDoc(collection(db, 'waitlist'), {
      ...userData,
      timestamp: serverTimestamp(),
      status: 'waitlist',
      inviteSent: false
    });
    
    // Send confirmation email (don't fail if email fails)
    try {
      await sendConfirmationEmail(userData.email, userData.firstName);
    } catch (emailError) {
      console.warn('Email sending failed, but user was added to waitlist:', emailError);
    }
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding waitlist user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, error: errorMessage };
  }
};

const sendConfirmationEmail = async (email: string, firstName: string) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Welcome to FullCircle Waitlist! 🌟',
        html: getWaitlistConfirmationEmail({ firstName })
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't fail the whole process if email fails
    return false;
  }
};

export const getAllWaitlistUsers = async (): Promise<WaitlistUser[]> => {
  try {
    const { getDocs, query, orderBy } = await import('firebase/firestore');
    const querySnapshot = await getDocs(query(collection(db, 'waitlist'), orderBy('timestamp', 'desc')));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        timestamp: data.timestamp || null,
        status: data.status || 'waitlist',
        inviteSent: data.inviteSent || false,
        inviteDate: data.inviteDate || null
      } as WaitlistUser;
    });
  } catch (error) {
    console.error('Error getting waitlist users:', error);
    return [];
  }
};

export const updateUserStatus = async (userId: string, status: WaitlistUser['status'], inviteSent: boolean = false) => {
  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const userRef = doc(db, 'waitlist', userId);
    await updateDoc(userRef, {
      status,
      inviteSent,
      inviteDate: inviteSent ? serverTimestamp() : null
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, error: errorMessage };
  }
};
