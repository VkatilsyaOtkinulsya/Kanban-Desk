export interface SignUpRequest {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface AuthResponse {
  [x: string]: string;
  token: string;
  email: string;
  userId: string;
  refreshToken: string;
  expiresIn: string;
}

export interface AuthError {
  code: number;
  message: string;
  errors?: Array<{
    message: string;
    domain: string;
    reason: string;
  }>;
}

export interface UserInfo {
  token: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  userId: string;
}

export interface FirebaseErrorResponse {
  error: {
    code: number;
    message: string;
    errors?: Array<{
      message: string;
      domain: string;
      reason: string;
    }>;
  };
}

export interface AuthToken {
  token: string;
  refreshToken: string;
  expiresIn: string;
}

export type FirebaseAuthErrorCode =
  | 'EMAIL_EXISTS'
  | 'OPERATION_NOT_ALLOWED'
  | 'TOO_MANY_ATTEMPTS_TRY_LATER'
  | 'EMAIL_NOT_FOUND'
  | 'INVALID_PASSWORD'
  | 'USER_DISABLED';
