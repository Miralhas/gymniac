import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full max-w-5xl mx-auto p-6 min-h-screen flex justify-center items-center">
      {children}
    </section>
  )
}

export default AuthLayout;
