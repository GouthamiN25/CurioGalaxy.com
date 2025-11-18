export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bio?: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  timestamp: number;
  likes: number;
  tags: string[];
  category: 'Technology' | 'Skills' | 'Tools' | 'General';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum NavSection {
  Home = 'home',
  Profile = 'profile',
  Tales = 'tales',
  Collection = 'collection',
  Guidora = 'guidora',
  Chat = 'chat'
}