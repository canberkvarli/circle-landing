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

export interface SubscriptionAssignmentResult {
  success: boolean;
  error?: string;
  subscriptionId?: string;
}

/**
 * Search for users by email, phone number, or name
 * Priority: email > phone > name
 */
export const searchUsersByField = async (
  field: 'email' | 'phone' | 'name', 
  value: string
): Promise<UserData[]> => {
  try {
    const usersRef = collection(db, 'users');
    let q;
    
    if (field === 'email') {
      // Search by email (exact match)
      q = query(usersRef, where('email', '==', value.toLowerCase()));
    } else if (field === 'phone') {
      // Search by phone number (exact match)
      q = query(usersRef, where('phoneNumber', '==', value));
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
      const data = doc.data();
      
      // For name search, filter results that contain the search term
      if (field === 'name') {
        const fullName = `${data.firstName || ''} ${data.familyName || ''}`.toLowerCase();
        if (!fullName.includes(value.toLowerCase())) {
          return; // Skip this user if name doesn't match
        }
      }
      
      // Only include users who have completed onboarding
      if (!data.onboardingCompleted) {
        return; // Skip users who haven't completed onboarding
      }
      
      users.push({
        userId: doc.id,
        firstName: data.firstName || '',
        familyName: data.familyName || '',
        fullName: data.fullName || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        subscription: data.subscription || { isActive: false },
        onboardingCompleted: data.onboardingCompleted || false,
        createdAt: data.createdAt,
        lastActive: data.lastActive
      });
    });
    
    return users;
  } catch (error) {
    console.error('Error searching users:', error);
    throw new Error('Failed to search users');
  }
};

/**
 * Assign a FullCircle subscription to a user
 * Creates a 1-month subscription with current timestamp
 */
export const assignFullCircleSubscription = async (userId: string): Promise<SubscriptionAssignmentResult> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Calculate subscription dates (1 month from now)
    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const oneMonthFromNow = now + (30 * 24 * 60 * 60); // 30 days in seconds
    
    const subscriptionData = {
      isActive: true,
      status: 'active',
      planType: 'monthly',
      currentPeriodStart: now,
      currentPeriodEnd: oneMonthFromNow,
      cancelAtPeriodEnd: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Note: We're not setting Stripe-related fields since this is a manual admin assignment
      // stripeCustomerId: null,
      // subscriptionId: null,
    };
    
    await updateDoc(userRef, {
      subscription: subscriptionData,
      // Also update some user fields to indicate they're now active
      lastActive: serverTimestamp(),
      // Give them some initial lotus if they don't have any
      numOfLotus: 10, // Default lotus amount for new subscribers
    });
    
    return {
      success: true,
      subscriptionId: `admin_${userId}_${now}`,
    };
    
  } catch (error) {
    console.error('Error assigning subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Get all users with active subscriptions
 */
export const getActiveSubscribers = async (): Promise<UserData[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef, 
      where('subscription.isActive', '==', true),
      where('onboardingCompleted', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const users: UserData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        userId: doc.id,
        firstName: data.firstName || '',
        familyName: data.familyName || '',
        fullName: data.fullName || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        subscription: data.subscription || { isActive: false },
        onboardingCompleted: data.onboardingCompleted || false,
        createdAt: data.createdAt,
        lastActive: data.lastActive
      });
    });
    
    return users;
  } catch (error) {
    console.error('Error getting active subscribers:', error);
    throw new Error('Failed to get active subscribers');
  }
};

/**
 * Revoke a user's subscription
 */
export const revokeSubscription = async (userId: string): Promise<SubscriptionAssignmentResult> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    const subscriptionData = {
      isActive: false,
      status: 'canceled',
      cancelAtPeriodEnd: true,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(userRef, {
      subscription: subscriptionData,
    });
    
    return {
      success: true,
    };
    
  } catch (error) {
    console.error('Error revoking subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
