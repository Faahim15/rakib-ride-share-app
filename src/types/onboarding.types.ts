// onboarding.types.ts
// Location: @/src/types/onboarding.types.ts

/**
 * Represents a single onboarding slide
 */
interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image?: any;
  imageWidth?: number; // Add this
  imageHeight?: number; // Add this
  isLanguageSelection?: boolean;
}

/**
 * Props for the OnboardingItem component
 */
export interface OnboardingItemProps {
  item: OnboardingSlide;
  onLanguageNext: () => void;
}

/**
 * Props for the ProgressButton component
 */
export interface ProgressButtonProps {
  progress: number;
  onPress: () => void;
  isLast?: boolean;
}

/**
 * Represents a language option
 */
export interface Language {
  id: string;
  name: string;
  code: string;
}

/**
 * Props for the LanguageSelection component
 */
export interface LanguageSelectionProps {
  onNext: () => void;
}
