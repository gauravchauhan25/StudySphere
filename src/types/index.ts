export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  subject: string;
  type: 'article' | 'video' | 'pdf' | 'link';
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}