import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

// GET: Retrieve individual user data
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing userId' 
      }, { status: 400 });
    }

    const db = getAdminDb();
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 404 });
    }

    const userData = userDoc.data();
    return NextResponse.json({ 
      success: true, 
      user: { userId, ...userData } 
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to get user data' 
    }, { status: 500 });
  }
}

// PUT: Update user data
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const updateData = await request.json();
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing userId' 
      }, { status: 400 });
    }

    if (!updateData || typeof updateData !== 'object') {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid update data' 
      }, { status: 400 });
    }

    const db = getAdminDb();
    const userRef = db.collection('users').doc(userId);
    
    // Check if user exists
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 404 });
    }

    // Add timestamp for audit trail
    const finalUpdateData = {
      ...updateData,
      updatedAt: new Date(),
      lastModifiedBy: 'admin', // TODO: Get actual admin ID
      lastModifiedAt: new Date()
    };

    // Update user document
    await userRef.set(finalUpdateData, { merge: true });

    return NextResponse.json({ 
      success: true, 
      message: 'User updated successfully' 
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update user' 
    }, { status: 500 });
  }
}

// POST: Perform specific actions on user
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const { action, data } = await request.json();
    
    if (!userId || !action) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing userId or action' 
      }, { status: 400 });
    }

    const db = getAdminDb();
    const userRef = db.collection('users').doc(userId);
    
    // Check if user exists
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 404 });
    }

    const userData = userDoc.data();
    const now = new Date();

    switch (action) {
      case 'grantLotus':
        if (!data?.amount || !data?.reason) {
          return NextResponse.json({ 
            success: false, 
            message: 'Missing amount or reason for lotus grant' 
          }, { status: 400 });
        }

        const currentLotus = userData?.numOfLotus || 0;
        const newLotusBalance = currentLotus + data.amount;

        // Create lotus purchase record
        const lotusPurchase = {
          lotusCount: data.amount,
          totalPrice: 0, // Admin granted, no cost
          purchaseDate: now,
          transactionId: `admin_grant_${Date.now()}_${userId}`,
          status: 'succeeded',
          adminGranted: true,
          reason: data.reason,
          grantedBy: 'admin' // TODO: Get actual admin ID
        };

        await userRef.set({
          numOfLotus: newLotusBalance,
          lotusPurchases: FieldValue.arrayUnion(lotusPurchase),
          lastLotusAssignedAt: now,
          updatedAt: now
        }, { merge: true });

        return NextResponse.json({ 
          success: true, 
          newBalance: newLotusBalance,
          message: `Granted ${data.amount} lotus flowers to user` 
        });

      case 'revokeLotus':
        if (!data?.amount || !data?.reason) {
          return NextResponse.json({ 
            success: false, 
            message: 'Missing amount or reason for lotus revocation' 
          }, { status: 400 });
        }

        const currentLotusForRevoke = userData?.numOfLotus || 0;
        const newLotusBalanceAfterRevoke = Math.max(0, currentLotusForRevoke - data.amount);

        // Create revocation record
        const lotusRevocation = {
          lotusCount: -data.amount, // Negative to indicate revocation
          totalPrice: 0,
          purchaseDate: now,
          transactionId: `admin_revoke_${Date.now()}_${userId}`,
          status: 'succeeded',
          adminRevoked: true,
          reason: data.reason,
          revokedBy: 'admin' // TODO: Get actual admin ID
        };

        await userRef.set({
          numOfLotus: newLotusBalanceAfterRevoke,
          lotusPurchases: FieldValue.arrayUnion(lotusRevocation),
          updatedAt: now
        }, { merge: true });

        return NextResponse.json({ 
          success: true, 
          newBalance: newLotusBalanceAfterRevoke,
          message: `Revoked ${data.amount} lotus flowers from user` 
        });

      case 'grantRadiance':
        if (!data?.amount || !data?.reason) {
          return NextResponse.json({ 
            success: false, 
            message: 'Missing amount or reason for radiance grant' 
          }, { status: 400 });
        }

        const currentBoosts = userData?.activeBoosts || 0;
        const newBoostBalance = currentBoosts + data.amount;

        // Create boost purchase record
        const boostPurchase = {
          boostCount: data.amount,
          totalPrice: 0, // Admin granted, no cost
          purchaseDate: now,
          transactionId: `admin_grant_${Date.now()}_${userId}`,
          status: 'succeeded',
          adminGranted: true,
          reason: data.reason,
          grantedBy: 'admin' // TODO: Get actual admin ID
        };

        await userRef.set({
          activeBoosts: newBoostBalance,
          boostPurchases: FieldValue.arrayUnion(boostPurchase),
          updatedAt: now
        }, { merge: true });

        return NextResponse.json({ 
          success: true, 
          newBalance: newBoostBalance,
          message: `Granted ${data.amount} radiance boosts to user` 
        });

      case 'revokeRadiance':
        if (!data?.amount || !data?.reason) {
          return NextResponse.json({ 
            success: false, 
            message: 'Missing amount or reason for radiance revocation' 
          }, { status: 400 });
        }

        const currentBoostsForRevoke = userData?.activeBoosts || 0;
        const newBoostBalanceAfterRevoke = Math.max(0, currentBoostsForRevoke - data.amount);

        // Create revocation record
        const boostRevocation = {
          boostCount: -data.amount, // Negative to indicate revocation
          totalPrice: 0,
          purchaseDate: now,
          transactionId: `admin_revoke_${Date.now()}_${userId}`,
          status: 'succeeded',
          adminRevoked: true,
          reason: data.reason,
          revokedBy: 'admin' // TODO: Get actual admin ID
        };

        await userRef.set({
          activeBoosts: newBoostBalanceAfterRevoke,
          boostPurchases: FieldValue.arrayUnion(boostRevocation),
          updatedAt: now
        }, { merge: true });

        return NextResponse.json({ 
          success: true, 
          newBalance: newBoostBalanceAfterRevoke,
          message: `Revoked ${data.amount} radiance boosts from user` 
        });

      case 'grantSubscription':
        await userRef.set({
          subscription: {
            isActive: true,
            status: 'active',
            planType: 'FullCircle',
            currentPeriodStart: Date.now(),
            currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
            cancelAtPeriodEnd: false,
            createdAt: now,
            updatedAt: now,
            grantedBy: 'admin' // TODO: Get actual admin ID
          },
          onboardingCompleted: true,
          updatedAt: now
        }, { merge: true });

        return NextResponse.json({ 
          success: true, 
          message: 'Granted fullcircle+ subscription to user' 
        });

      case 'revokeSubscription':
        await userRef.set({
          subscription: {
            isActive: false,
            status: 'canceled',
            canceledAt: now,
            updatedAt: now,
            revokedBy: 'admin' // TODO: Get actual admin ID
          },
          updatedAt: now
        }, { merge: true });

        return NextResponse.json({ 
          success: true, 
          message: 'Revoked subscription from user' 
        });

      default:
        return NextResponse.json({ 
          success: false, 
          message: `Unknown action: ${action}` 
        }, { status: 400 });
    }

  } catch (error) {
    console.error('User action error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to perform user action' 
    }, { status: 500 });
  }
}
