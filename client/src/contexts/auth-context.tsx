'use client'

import { PropsWithChildren } from "react";
import { createContext } from "./create-context";

type AuthActions = {
  getAuthState: () => string;
}

const { ContextProvider, useContext } = createContext<AuthActions>();

export const AuthProvider = ({ children }: PropsWithChildren) => {

}

// Overview:

// AccessToken can be accessed from client components.
// RefreshToken can only be accessed via Server components

// In the Middleware, check if the accesstoken cookie is expiring.
// If so, delete it from the cookies, get the refreshToken and refresh both tokens. 

// If the refresh request is successfull, update the access and refresh token cookies. 
// RefreshToken should be http-only and AccessToken not.

// All the verification and refresh should be done in the Middleware.

// How to: 

// 1. In the Middleware, for every route request, check if the accessToken is expiring.
// 2. If the accessToken is expired or to be expired in 5 minutes or less, then we need to refresh it.
// 3. Since we are in the Middleware, we have access to the refreshToken stored as a http-only cookie.
// 4. Retrieve the refreshToken, make an http request to ${BACKEND_URL}/api/auth/refresh-token with the refreshToken as its body.
// 5. If the request is successfull (2xx), then store the refreshed tokens as cookies (refreshToken as http-only)
// 6. If the request is not successfull, then just delete all cookies and unauthenticate the user.