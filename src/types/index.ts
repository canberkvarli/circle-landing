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
