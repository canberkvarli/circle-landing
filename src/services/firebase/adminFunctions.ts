// Note: Client-side admin functions call server API routes; no direct Firestore access here

export interface UserData {
  userId: string;
  isSeedUser: boolean;
  firstName?: string;
  familyName?: string;
  fullName?: string;
  email: string;
  phoneNumber?: string;
  currentOnboardingScreen?: string | null;
  countryCode?: string;
  areaCode?: string;
  number?: string;
  regionName?: string;
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
  numOfLotus?: number; // Updated to match mobile app
  activeBoosts?: number; // Added for radiance boosts
  spiritualProfile?: {
    practices?: string[];
  };
  matchPreferences?: {
    connectionIntent?: string;
  };
  photos?: string[];
  settings?: {
    pushToken?: string;
  };
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
      isSeedUser: u.isSeedUser as boolean || false,
      firstName: u.firstName as string | undefined,
      familyName: u.familyName as string | undefined,
      fullName: u.fullName as string | undefined,
      email: u.email as string,
      phoneNumber: u.phoneNumber as string | undefined,
      currentOnboardingScreen: u.currentOnboardingScreen as string | null | undefined,
      countryCode: u.countryCode as string | undefined,
      areaCode: u.areaCode as string | undefined,
      number: u.number as string | undefined,
      regionName: u.regionName as string | undefined,
      subscription: u.subscription as UserData['subscription'],
      onboardingCompleted: u.onboardingCompleted as boolean | undefined,
      createdAt: u.createdAt as Date | undefined,
      lastActive: u.lastActive as Date | undefined,
      numOfLotus: u.numOfLotus as number | undefined, // Updated field name
      activeBoosts: u.activeBoosts as number | undefined, // Added field
      spiritualProfile: u.spiritualProfile as { practices?: string[] } | undefined,
      matchPreferences: u.matchPreferences as { connectionIntent?: string } | undefined,
      photos: u.photos as string[] | undefined,
      settings: u.settings as { pushToken?: string } | undefined,
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
      isSeedUser: u.isSeedUser as boolean || false,
      firstName: u.firstName as string | undefined,
      familyName: u.familyName as string | undefined,
      fullName: u.fullName as string | undefined,
      email: u.email as string,
      phoneNumber: u.phoneNumber as string | undefined,
      currentOnboardingScreen: u.currentOnboardingScreen as string | null | undefined,
      countryCode: u.countryCode as string | undefined,
      areaCode: u.areaCode as string | undefined,
      number: u.number as string | undefined,
      regionName: u.regionName as string | undefined,
      subscription: u.subscription as UserData['subscription'],
      onboardingCompleted: u.onboardingCompleted as boolean | undefined,
      createdAt: u.createdAt as Date | undefined,
      lastActive: u.lastActive as Date | undefined,
      numOfLotus: u.numOfLotus as number | undefined, // Updated field name
      activeBoosts: u.activeBoosts as number | undefined, // Added field
      spiritualProfile: u.spiritualProfile as { practices?: string[] } | undefined,
      matchPreferences: u.matchPreferences as { connectionIntent?: string } | undefined,
      photos: u.photos as string[] | undefined,
      settings: u.settings as { pushToken?: string } | undefined,
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
 * Grant lotus flowers to a user
 */
export async function grantLotusFlowers(
  userId: string, 
  amount: number, 
  reason: string
): Promise<{ success: boolean; error?: string; newBalance?: number }> {
  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'grantLotus', 
        userId, 
        amount, 
        reason 
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { success: true, newBalance: data.newBalance };
  } catch (error) {
    console.error('Error granting lotus flowers:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Revoke lotus flowers from a user
 */
export async function revokeLotusFlowers(
  userId: string, 
  amount: number, 
  reason: string
): Promise<{ success: boolean; error?: string; newBalance?: number }> {
  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'revokeLotus', 
        userId, 
        amount, 
        reason 
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { success: true, newBalance: data.newBalance };
  } catch (error) {
    console.error('Error revoking lotus flowers:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Grant radiance boosts to a user
 */
export async function grantRadianceBoosts(
  userId: string, 
  amount: number, 
  reason: string
): Promise<{ success: boolean; error?: string; newBalance?: number }> {
  try {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'grantRadiance', 
        data: { amount, reason } 
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { success: true, newBalance: data.newBalance };
  } catch (error) {
    console.error('Error granting radiance boosts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Revoke radiance boosts from a user
 */
export async function revokeRadianceBoosts(
  userId: string, 
  amount: number, 
  reason: string
): Promise<{ success: boolean; error?: string; newBalance?: number }> {
  try {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'revokeRadiance', 
        data: { amount, reason } 
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { success: true, newBalance: data.newBalance };
  } catch (error) {
    console.error('Error revoking radiance boosts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send notification to user(s)
 */
export async function sendNotification(
  userIds: string[] | null,
  title: string,
  message: string,
  type: 'email' | 'push' | 'both' = 'push'
): Promise<{ success: boolean; error?: string; notificationId?: string; totalRecipients?: number; successfulDeliveries?: number; failedDeliveries?: number }> {
  try {
    const payload: {
      title: string;
      body: string;
      notificationType: string;
      data: { source: string; timestamp: number };
      userIds?: string[];
      broadcast?: boolean;
    } = {
      title,
      body: message,
      notificationType: type,
      data: {
        source: 'admin-dashboard',
        timestamp: Date.now()
      }
    };

    if (userIds && userIds.length > 0) {
      payload.userIds = userIds;
    } else {
      payload.broadcast = true;
    }

    const res = await fetch('/api/admin/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      success: true,
      notificationId: data.notificationId,
      totalRecipients: data.totalRecipients,
      successfulDeliveries: data.successfulDeliveries,
      failedDeliveries: data.failedDeliveries
    };
  } catch (error) {
    console.error('Error sending notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get admin dashboard statistics
 */
export async function getAdminStats(): Promise<{
  success: boolean;
  stats?: Record<string, unknown>;
  error?: string;
}> {
  try {
    const res = await fetch('/api/admin/stats', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { success: true, stats: data.stats };
  } catch (error) {
    console.error('Error getting admin stats:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Get lotus transaction history for a user
 */
export async function getUserLotusHistory(userId: string): Promise<{
  success: boolean;
  transactions?: Record<string, unknown>[];
  error?: string;
}> {
  try {
    const res = await fetch(`/api/admin/users/${userId}/lotus-history`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { success: true, transactions: data.transactions };
  } catch (error) {
    console.error('Error getting lotus history:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Bulk operations for multiple users
 */
export async function performBulkOperation(
  type: 'grantLotus' | 'revokeLotus' | 'grantRadiance' | 'revokeRadiance' | 'sendNotification' | 'grantSubscription' | 'revokeSubscription',
  userIds: string[],
  data?: Record<string, unknown>
): Promise<{ success: boolean; error?: string; operationId?: string }> {
  try {
    const res = await fetch('/api/admin/bulk-operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, userIds, data }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const responseData = await res.json();
    return { success: true, operationId: responseData.operationId };
  } catch (error) {
    console.error('Error performing bulk operation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
