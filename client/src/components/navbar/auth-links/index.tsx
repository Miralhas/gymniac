import { useAuthContext } from "@/contexts/auth-context";
import LoginButton from "./login-button";
import UserAccount from "./user-account";

const AuthLinks = () => {
  const { authState, isLoading, logout } = useAuthContext();

  if (isLoading || !authState) {
    return <LoginButton isLoading={isLoading} />
  }

  return <UserAccount logout={logout} accessToken={authState.accessToken} />

}

export default AuthLinks;
