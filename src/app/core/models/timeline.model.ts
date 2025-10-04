export interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  location?: string;
  icon?: string;
  iconColor?: string;
  bgColor?: string;
  technologies?: string[];
  isLeftAligned?: boolean;
}