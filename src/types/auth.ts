/**
 * Decoded JWT token payload from Azure AD B2C.
 */
export interface IDecodedToken {
  sub: string;
  email?: string;
  name?: string;
  iss?: string;
  aud?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  [key: string]: unknown;
}

/**
 * User context injected by auth middleware into req.user.
 */
export interface IUserContext {
  id?: string;
  azureAdB2cId: string;
  email?: string;
  roles: string[];
}

/**
 * Frontend authentication state (Zustand store shape).
 */
export interface IAuthState {
  user: IAuthUser | null;
  isAuthenticated: boolean;
  roles: string[];
  isLoading: boolean;
  lastActivity: number;
}

/**
 * Authenticated user info stored in frontend state.
 */
export interface IAuthUser {
  id: string;
  email: string;
  name: string;
}

/**
 * Session configuration parameters from ConfigParameter table.
 */
export interface ISessionConfig {
  timeoutMinutes: number;
  warningMinutes: number;
}
