import { AuthState } from '@/types/auth';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { decrypt } from '@/utils/decrypt-jwt';
import Cookies from 'js-cookie';

export const getAuthState = async () => {
  const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
  if (!accessToken) return null;
  
  const user = decrypt(accessToken);
  if (!user) return null;

  const authState: AuthState = {
    user,
    accessToken
  }

  return authState;
}