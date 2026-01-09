import LoginForm from "@/components/authentication/login/login-form";

const LoginPage = () => {
  return (
    <div className="w-full mx-auto max-w-100 space-y-4 relative">
      <LoginForm />
      <div className="absolute -top-20 -left-10 w-[350px] h-[350px] bg-emerald-600/40 rounded-full blur-[80px] opacity-70"></div>
      <div className="absolute top-40 left-40 w-[350px] h-[350px] bg-emerald-600/30 rounded-full blur-[70px] opacity-50"></div>
    </div>
  )
}

export default LoginPage;
