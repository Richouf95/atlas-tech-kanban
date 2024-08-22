export interface User {
    userId: string;
    email: string;
    name: string;
    token: string
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}