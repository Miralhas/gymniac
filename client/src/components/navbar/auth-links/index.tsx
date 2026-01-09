import { useAuthContext } from "@/contexts/auth-context";
import LoginButton from "./login-button";
import UserAccount from "./user-account";

const AuthLinks = () => {
  const { authState, isLoading, logout } = useAuthContext();

  if (isLoading || !authState) {
    return <LoginButton isLoading={isLoading} />
  }

  return <UserAccount user={authState.user} logout={logout} />

}

export default AuthLinks;
