export interface AuthRequest {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface AuthBasePayload {
  email: string;
  password: string;
}

export interface SignUpRequest extends AuthBasePayload {
  firstName: string;
  lastName: string;
}

export interface SignInRequest extends AuthBasePayload {}

export type AuthPayload = SignInRequest | SignUpRequest;

export function isSignUpRequest(payload: AuthPayload): payload is SignUpRequest {
  return 'firstName' in payload && 'lastName' in payload;
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

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserInfo {
  token: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  userId: string;
  firstName: string;
  lastName: string;
}

export type FirebaseAuthErrorCode =
  | 'EMAIL_EXISTS'
  | 'OPERATION_NOT_ALLOWED'
  | 'TOO_MANY_ATTEMPTS_TRY_LATER'
  | 'EMAIL_NOT_FOUND'
  | 'INVALID_PASSWORD'
  | 'USER_DISABLED';
