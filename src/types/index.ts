// types/index.ts

export interface Stats {
  signups: number;
  totalSpots: number;
  connections: number;
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FormData {
  email: string;
  name?: string;
  phone?: string;
  practices?: string;
  message?: string;
  subject?: string;
  timestamp: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SubmitModalProps extends ModalProps {
  onSubmit: (data: FormData) => Promise<{ success: boolean }>;
  isSubmitting: boolean;
  submitMessage: string;
}

export interface HeaderProps {
  scrolled: boolean;
  showIntro: boolean;
  stats: Stats;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  openModal: (modalId: string) => void;
}

export interface HeroSectionProps {
  showIntro: boolean;
  stats: Stats;
  countdown: Countdown;
  openModal: (modalId: string) => void;
}

export interface SectionProps {
  showIntro: boolean;
}

export interface FooterProps extends SectionProps {
  openModal: (modalId: string) => void;
}

export type AboutSectionProps = FooterProps;

export interface RoadmapItem {
  status: string;
  statusColor: string;
  period: string;
  title: string;
  description: string;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// Admin Dashboard Types - Updated to match mobile app structure
export interface UserDataType {
  userId: string;
  createdAt: Date;
  lastActive?: Date;
  isSeedUser: boolean;
  numOfLotus?: number;
  lotusPurchases?: LotusPurchase[];
  lastLotusAssignedAt?: Date;
  currentOnboardingScreen: string;
  phoneNumber: string;
  verificationId?: string | null;
  countryCode: string;
  areaCode: string;
  number: string;
  email: string;
  GoogleSSOEnabled?: boolean;
  AppleSSOEnabled?: boolean;
  marketingRequested?: boolean;
  firstName?: string;
  familyName?: string;
  fullName?: string;
  birthdate?: string;
  birthmonth?: string;
  birthday?: string;
  birthyear?: string;
  age?: number;
  height?: number;
  regionName?: string;
  longitude?: number;
  latitude?: number;
  gender?: string[];
  photos?: string[];
  hiddenFields?: { [key: string]: boolean };
  location?: {
    city?: string;
    country?: string;
    formattedAddress?: string;
    isoCountryCode?: string;
    name?: string;
    postalCode?: string;
    region?: string;
    street?: string;
    streetNumber?: string;
    subregion?: string;
  };
  
  // 🔮 Spiritual Profile Section
  spiritualProfile?: {
    draws?: string[];
    practices?: string[];
    healingModalities?: string[];
  };
  
  subscription?: {
    isActive: boolean;
    stripeCustomerId?: string;
    subscriptionId?: string;
    status?: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired';
    planType?: 'monthly' | 'yearly';
    currentPeriodStart?: number;
    currentPeriodEnd?: number;
    cancelAtPeriodEnd?: boolean;
    canceledAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  };
  
  likesGivenCount?: number;
  likesReceivedCount?: number;
  dislikesGivenCount?: number;
  dislikesReceivedCount?: number;
  matches?: string[];
  onboardingCompleted?: boolean;
  onboardingCompletedAt?: Date;
  
  matchPreferences?: {
    preferredAgeRange?: {
      min: number;
      max: number;
    };
    preferredHeightRange?: {
      min: number;
      max: number;
    };
    preferredDistance: number;
    connectionIntent?: "romantic" | "friendship" | "both";
    connectionPreferences?: string[];
    connectionStyles?: string[];
    spiritualCompatibility?: {
      spiritualDraws?: string[];
      practices?: string[];
      healingModalities?: string[];
    };
    datePreferences: string[];
  };
  
  dailyLikesCount?: number;
  lastLikeResetDate?: Date;
  DAILY_LIKE_LIMIT?: number;
  settings?: UserSettings;
  activeBoosts?: number;
  boostExpiresAt?: Date;
  boostPurchases?: BoostPurchase[];
  reportedUsers?: string[];
  unmatchedUsers?: string[];
}

export interface LotusPurchase {
  lotusCount: number;
  totalPrice: number;
  purchaseDate: Date;
  transactionId: string;
  stripePaymentIntentId?: string;
  status: 'succeeded' | 'processing' | 'failed'; 
}

export interface BoostPurchase {
  boostCount: number;
  totalPrice: number;
  purchaseDate: Date;
  transactionId: string;
  stripePaymentIntentId?: string;
  status: 'succeeded' | 'processing' | 'failed'; 
}

export interface UserSettings {
  isPaused?: boolean;
  showLastActiveStatus?: boolean;
  isSelfieVerified?: boolean;
  selfieVerificationDate?: Date;
  pushNotifications?: PushNotificationSettings;
  pushToken?: string;
  notificationPermissionStatus?: 'granted' | 'denied' | 'not-requested';
  connectedAccounts?: {
    google?: boolean;
    apple?: boolean;
  };
}

export interface PushNotificationSettings {
  enableAll?: boolean;
  muteAll?: boolean;
  newLikes?: boolean;
  newMatches?: boolean;
  newMessages?: boolean;
  promotions?: boolean;
  announcements?: boolean;
}

export interface NotificationPreferences {
  messageNotifications?: boolean;
  matchNotifications?: boolean;
  likeNotifications?: boolean;
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

export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  waitlistUsers: number;
  totalLotusGranted: number;
  totalLotusSpent: number;
  totalRadianceBoosts: number;
  recentSignups: number;
  recentSubscriptions: number;
  totalLotusBalance: number;
  averageLotusPerUser: number;
  onboardingCompletionRate: number;
}

export interface BulkOperation {
  type: 'grantLotus' | 'revokeLotus' | 'grantRadiance' | 'revokeRadiance' | 'sendNotification' | 'grantSubscription' | 'revokeSubscription';
  userIds: string[];
  data?: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  createdAt: Date;
}
