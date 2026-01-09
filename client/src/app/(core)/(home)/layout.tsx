import Container from "@/components/container";
import { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full min-h-[calc(100vh-60px)] flex justify-center items-center overflow-hidden">
      <Container className="p-4 relative">
        {children}
        <div className="absolute -top-30 left-1/2 w-[300px] h-[300px] bg-emerald-600/40 rounded-full blur-[80px] opacity-90"></div>
        <div className="absolute top-50 left-80 w-[300px] h-[300px] bg-emerald-600/30 rounded-full blur-[70px] opacity-70"></div>
      </Container>
    </section >
  )
}

export default HomeLayout;
