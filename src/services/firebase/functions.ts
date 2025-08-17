import { db } from './config';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

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
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8B5CF6; font-size: 28px; margin: 0;">🌟 FullCircle Waitlist 🌟</h1>
            </div>
            
            <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
              <h2 style="color: #8B5CF6; font-size: 24px; margin: 0 0 20px 0;">Welcome, ${firstName}!</h2>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                Thank you for joining our exclusive waitlist! You're now part of a community of mindful seekers 
                who are ready to experience authentic spiritual connections.
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                We'll notify you as soon as the FullCircle app launches with your exclusive early access.
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
                Stay tuned for updates and be ready to start your spiritual connection journey!
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #8B5CF6; border-radius: 15px; color: white;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">✨ You're on the list! ✨</p>
              <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
                First 5,000 members get 1 month completely free
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #6B7280; font-size: 14px;">
              <p style="margin: 0;">With gratitude,<br><strong>The FullCircle Team</strong></p>
            </div>
          </div>
        `
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
