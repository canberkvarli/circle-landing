import { db } from './config';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export interface UserData {
  userId: string;
  firstName?: string;
  familyName?: string;
  fullName?: string;
  email: string;
  phoneNumber?: string;
  subscription?: {
    isActive: boolean;
    stripeCustomerId?: string;
    subscriptionId?: string;
    status?: string;
    planType?: string;
    currentPeriodStart?: number;
    currentPeriodEnd?: number;
    cancelAtPeriodEnd?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
  onboardingCompleted?: boolean;
  createdAt?: Date;
  lastActive?: Date;
}

export interface WaitlistUser {
  id?: string;
  firstName?: string;
  familyName?: string;
  fullName?: string;
  email: string;
  phoneNumber?: string;
  createdAt?: Date;
}

export interface SubscriptionAssignmentResult {
  success: boolean;
  error?: string;
  subscriptionId?: string;
}

/**
 * Search for users by email, phone number, or name
 * Priority: Email > Phone > Name (most reliable to least reliable)
 */
export async function searchUsersByField(
  searchValue: string, 
  field: 'email' | 'phone' | 'name'
): Promise<UserData[]> {
  try {
    const usersRef = collection(db, 'users');
    let q;

    if (field === 'email') {
      // Search by email (exact match)
      q = query(usersRef, where('email', '==', searchValue.toLowerCase()));
    } else if (field === 'phone') {
      // Search by phone number (exact match)
      q = query(usersRef, where('phoneNumber', '==', searchValue));
    } else if (field === 'name') {
      // Search by name (partial match - we'll need to filter results)
      // Note: Firestore doesn't support partial text search, so we'll get all users and filter
      q = query(usersRef);
    }
    
    if (!q) {
      throw new Error('Invalid search field');
    }
    
    const querySnapshot = await getDocs(q);
    const users: UserData[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const user: UserData = {
        userId: doc.id,
        firstName: userData.firstName,
        familyName: userData.familyName,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        subscription: userData.subscription,
        onboardingCompleted: userData.onboardingCompleted,
        createdAt: userData.createdAt,
        lastActive: userData.lastActive,
      };

      // If searching by name, filter results to include partial matches
      if (field === 'name') {
        const fullName = `${user.firstName || ''} ${user.familyName || ''}`.toLowerCase();
        const searchLower = searchValue.toLowerCase();
        if (fullName.includes(searchLower) || user.fullName?.toLowerCase().includes(searchLower)) {
          users.push(user);
        }
      } else {
        users.push(user);
      }
    });

    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    throw new Error('Failed to search users');
  }
}

/**
 * Get all waitlist users from the waitlist collection
 */
export async function getWaitlistUsers(): Promise<WaitlistUser[]> {
  try {
    console.log('Firebase: Getting waitlist users...');
    const waitlistRef = collection(db, 'waitlist');
    console.log('Firebase: Waitlist collection reference created');
    
    const querySnapshot = await getDocs(waitlistRef);
    console.log('Firebase: Waitlist query completed, found', querySnapshot.size, 'documents');
    
    const users: WaitlistUser[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log('Firebase: Processing waitlist user:', doc.id, userData);
      users.push({
        id: doc.id,
        firstName: userData.firstName,
        familyName: userData.familyName,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        createdAt: userData.createdAt,
      });
    });

    console.log('Firebase: Returning', users.length, 'waitlist users');
    return users;
  } catch (error) {
    console.error('Firebase: Error getting waitlist users:', error);
    throw new Error(`Failed to get waitlist users: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all users from the users collection (app users)
 */
export async function getAppUsers(): Promise<UserData[]> {
  try {
    console.log('Firebase: Getting app users...');
    const usersRef = collection(db, 'users');
    console.log('Firebase: Users collection reference created');
    
    const querySnapshot = await getDocs(usersRef);
    console.log('Firebase: Users query completed, found', querySnapshot.size, 'documents');
    
    const users: UserData[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log('Firebase: Processing app user:', doc.id, userData);
      const user: UserData = {
        userId: doc.id,
        firstName: userData.firstName,
        familyName: userData.familyName,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        subscription: userData.subscription,
        onboardingCompleted: userData.onboardingCompleted,
        createdAt: userData.createdAt,
        lastActive: userData.lastActive,
      };
      users.push(user);
    });

    console.log('Firebase: Returning', users.length, 'app users');
    return users;
  } catch (error) {
    console.error('Firebase: Error getting app users:', error);
    throw new Error(`Failed to get app users: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Assign a FullCircle subscription to a user
 * This creates a 1-month subscription with 10 lotus
 */
export async function assignFullCircleSubscription(userId: string): Promise<SubscriptionAssignmentResult> {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Create subscription data
    const subscriptionData = {
      subscription: {
        isActive: true,
        status: 'active',
        planType: 'FullCircle',
        currentPeriodStart: Date.now(),
        currentPeriodEnd: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
        cancelAtPeriodEnd: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      // Add 10 lotus to the user
      lotusCount: 10,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(userRef, subscriptionData);

    return {
      success: true,
      subscriptionId: `sub_${Date.now()}`,
    };
  } catch (error) {
    console.error('Error assigning subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get all users with active FullCircle subscriptions
 */
export async function getActiveSubscribers(): Promise<UserData[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('subscription.isActive', '==', true));
    const querySnapshot = await getDocs(q);
    const users: UserData[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const user: UserData = {
        userId: doc.id,
        firstName: userData.firstName,
        familyName: userData.familyName,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        subscription: userData.subscription,
        onboardingCompleted: userData.onboardingCompleted,
        createdAt: userData.createdAt,
        lastActive: userData.lastActive,
      };
      users.push(user);
    });

    return users;
  } catch (error) {
    console.error('Error getting active subscribers:', error);
    throw new Error('Failed to get active subscribers');
  }
}

/**
 * Revoke a user's FullCircle subscription
 */
export async function revokeSubscription(userId: string): Promise<SubscriptionAssignmentResult> {
  try {
    const userRef = doc(db, 'users', userId);
    
    const subscriptionData = {
      subscription: {
        isActive: false,
        status: 'cancelled',
        updatedAt: serverTimestamp(),
      },
      updatedAt: serverTimestamp(),
    };

    await updateDoc(userRef, subscriptionData);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error revoking subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
