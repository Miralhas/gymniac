import LoginForm from "@/components/authentication/login/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login"
};

const LoginPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const params = (await searchParams);

  return (
    <div className="w-full mx-auto max-w-100 space-y-4 relative">
      <LoginForm redirectUri={params["redirect"]} />
      <div className="absolute -top-20 -left-10 w-[350px] h-[350px] bg-emerald-600/40 rounded-full blur-[80px] opacity-70"></div>
      <div className="absolute top-40 left-40 w-[350px] h-[350px] bg-emerald-600/30 rounded-full blur-[70px] opacity-50"></div>
    </div>
  )
}

export default LoginPage;
