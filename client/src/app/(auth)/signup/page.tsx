import SignupForm from "@/components/authentication/signup/signup-form";

const SignupPage = () => {
  return (
    <div className="w-full mx-auto max-w-100 space-y-4 relative ">
      <SignupForm />
      <div className="absolute -top-20 -left-10 w-[350px] h-[350px] bg-emerald-600/30 dark:bg-emerald-600/40 rounded-full blur-[80px] opacity-80 dark:opacity-70"></div>
      <div className="absolute top-40 left-40 w-[350px] h-[350px] bg-emerald-600/20 dark:bg-emerald-600/30 rounded-full blur-[70px] opacity-60 dark:opacity-50"></div>
    </div>
  )
}

export default SignupPage;
