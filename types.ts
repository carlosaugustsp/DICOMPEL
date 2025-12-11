export type UserRole = 'admin' | 'rep';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  password?: string; // Added password field for authentication
}

export interface Client {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  repId: string; // The Rep responsible for this client
  createdAt: string;
}

export interface Product {
  id: string;
  code: string;
  reference: string;
  description: string;
  category: string;
  line: string; 
  subLine?: string; // Added Sub-line field
  amperage?: string; // Added Amperage field (10A/20A)
  price?: number; // Made optional as per request
  imageUrl: string;
  colors: string[];
  tags: string[];
  active: boolean;
}

export interface CartItem extends Product {
  selectedColor: string;
  quantity: number;
}

export type QuoteStatus = 'pending' | 'approved' | 'lost';

export interface Quote {
  id: string;
  customerName: string;
  customerCompany?: string; // Added Company/Store field
  customerEmail?: string;
  repId: string; // ID of the rep selected by the client
  repName: string;
  date: string;
  items: CartItem[];
  status: QuoteStatus;
  notes?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}