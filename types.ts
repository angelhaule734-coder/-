export enum Tab {
  HOME = 'HOME',
  HISTORY = 'HISTORY',
  GUIDE = 'GUIDE',
  INTERACTIVE = 'INTERACTIVE'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SiteInfo {
  title: string;
  content: string;
  icon?: string;
}