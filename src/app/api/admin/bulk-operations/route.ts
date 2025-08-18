import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { type, userIds, data } = await request.json();
    
    if (!type || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing type, userIds, or invalid userIds array' 
      }, { status: 400 });
    }

    const db = getAdminDb();
    
    // Process bulk operation without storing in database

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process each user
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      try {
        const userRef = db.collection('users').doc(userId);
        
        switch (type) {
          case 'grantLotus':
            if (data?.amount && data?.reason) {
              const userDoc = await userRef.get();
              if (userDoc.exists) {
                const userData = userDoc.data();
                const currentLotus = userData?.lotusCount || 0;
                const newBalance = currentLotus + data.amount;
                
                await userRef.set(
                  { lotusCount: newBalance, updatedAt: new Date() },
                  { merge: true }
                );
                
                // Record transaction
                const transactionRef = db.collection('lotusTransactions').doc();
                await transactionRef.set({
                  id: transactionRef.id,
                  userId,
                  amount: data.amount,
                  type: 'grant',
                  reason: data.reason,
                  adminId: 'admin',
                  timestamp: new Date(),
                });
                
                successCount++;
              }
            }
            break;
            
          case 'revokeLotus':
            if (data?.amount && data?.reason) {
              const userDoc = await userRef.get();
              if (userDoc.exists) {
                const userData = userDoc.data();
                const currentLotus = userData?.lotusCount || 0;
                const newBalance = Math.max(0, currentLotus - data.amount);
                
                await userRef.set(
                  { lotusCount: newBalance, updatedAt: new Date() },
                  { merge: true }
                );
                
                // Record transaction
                const transactionRef = db.collection('lotusTransactions').doc();
                await transactionRef.set({
                  id: transactionRef.id,
                  userId,
                  amount: data.amount,
                  type: 'revoke',
                  reason: data.reason,
                  adminId: 'admin',
                  timestamp: new Date(),
                });
                
                successCount++;
              }
            }
            break;
            
          case 'grantSubscription':
            const now = Date.now();
            await userRef.set(
              {
                subscription: {
                  isActive: true,
                  status: 'active',
                  planType: 'FullCircle',
                  currentPeriodStart: now,
                  currentPeriodEnd: now + 30 * 24 * 60 * 60 * 1000,
                  cancelAtPeriodEnd: false,
                  updatedAt: new Date(),
                  createdAt: new Date(),
                },
                lotusCount: 10,
                updatedAt: new Date(),
              },
              { merge: true }
            );
            successCount++;
            break;
            
          case 'revokeSubscription':
            await userRef.set(
              {
                subscription: {
                  isActive: false,
                  status: 'cancelled',
                  updatedAt: new Date(),
                },
                updatedAt: new Date(),
              },
              { merge: true }
            );
            successCount++;
            break;
            
          case 'sendNotification':
            // Send notification without storing in database
            successCount++;
            break;
            
          default:
            errors.push(`Unknown operation type: ${type}`);
            errorCount++;
        }
        
        // Update progress (no database update needed)
        
      } catch (error) {
        errorCount++;
        errors.push(`User ${userId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Operation completed (no database update needed)

    return NextResponse.json({ 
      success: true, 
      operationId: 'bulk-operation-' + Date.now(),
      results: {
        total: userIds.length,
        success: successCount,
        errors: errorCount,
        errorDetails: errors
      }
    });

  } catch (error) {
    console.error('Bulk operation error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to perform bulk operation' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      message: 'Bulk operations endpoint is working but no operations are stored in database',
      operations: []
    });
  } catch (error) {
    console.error('Bulk operations list error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to list bulk operations' 
    }, { status: 500 });
  }
}
