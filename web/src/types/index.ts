// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt?: string;
}

// Authentication response from API
export interface AuthResponse {
  token: string;
  user: User;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register credentials
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
