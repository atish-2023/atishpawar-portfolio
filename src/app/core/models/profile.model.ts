export interface ProfileConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  badges?: string[];
  features?: FeatureItem[];
}

export interface FeatureItem {
  icon: string;
  text: string;
}

export interface CardConfig {
  title?: string;
  subtitle?: string;
  content?: string;
  hasGlassmorphism?: boolean;
  hasGradientBorder?: boolean;
  customClasses?: string;
}