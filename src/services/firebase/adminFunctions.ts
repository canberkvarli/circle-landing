// Note: Client-side admin functions call server API routes; no direct Firestore access here

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
    const params = new URLSearchParams({ q: searchValue, field });
    const res = await fetch(`/api/admin/search?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data.users || []).map((u: Record<string, unknown>) => ({
      userId: u.id as string,
      firstName: u.firstName as string | undefined,
      familyName: u.familyName as string | undefined,
      fullName: u.fullName as string | undefined,
      email: u.email as string,
      phoneNumber: u.phoneNumber as string | undefined,
      subscription: u.subscription as UserData['subscription'],
      onboardingCompleted: u.onboardingCompleted as boolean | undefined,
      createdAt: u.createdAt as Date | undefined,
      lastActive: u.lastActive as Date | undefined,
    }));
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
    const res = await fetch('/api/admin/waitlist', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data.users || []).map((u: Record<string, unknown>) => ({
      id: u.id as string,
      firstName: u.firstName as string | undefined,
      familyName: u.familyName as string | undefined,
      fullName: u.fullName as string | undefined,
      email: u.email as string,
      phoneNumber: u.phoneNumber as string | undefined,
      createdAt: u.createdAt as Date | undefined,
    }));
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
    const res = await fetch('/api/admin/users', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data.users || []).map((u: Record<string, unknown>) => ({
      userId: u.id as string,
      firstName: u.firstName as string | undefined,
      familyName: u.familyName as string | undefined,
      fullName: u.fullName as string | undefined,
      email: u.email as string,
      phoneNumber: u.phoneNumber as string | undefined,
      subscription: u.subscription as UserData['subscription'],
      onboardingCompleted: u.onboardingCompleted as boolean | undefined,
      createdAt: u.createdAt as Date | undefined,
      lastActive: u.lastActive as Date | undefined,
    }));
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
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'grantFullCircle', userId }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { success: true, subscriptionId: `sub_${Date.now()}` };
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
  // For now, fetch all then filter client-side; could add a dedicated API if needed
  const all = await getAppUsers();
  return all.filter((u) => u.subscription?.isActive);
}

/**
 * Revoke a user's FullCircle subscription
 */
export async function revokeSubscription(userId: string): Promise<SubscriptionAssignmentResult> {
  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'revokeSubscription', userId }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { success: true };
  } catch (error) {
    console.error('Error revoking subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Update arbitrary user fields (server-side via Admin SDK)
 */
export async function updateUserFields(
  userId: string,
  data: Partial<UserData>
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', userId, data }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating user fields:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
