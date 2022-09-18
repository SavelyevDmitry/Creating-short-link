import { TAppState } from "../store";

export const getAuthToken = (state: TAppState): string => state.auth.authToken;
export const getLoginError = (state: TAppState): string => state.auth.loginError;
export const getSignupMessage = (state: TAppState): string => state.auth.signupMessage;
export const getIsAuth = (state: TAppState): boolean => state.auth.isAuth;
export const getUserName = (state: TAppState): string | null => state.auth.username;
export const getIsAuthInProgress = (state: TAppState): boolean => state.auth.isAuthInProgress; 
export const getIsSignupInProgress = (state: TAppState): boolean => state.auth.isSignupInProgress; 