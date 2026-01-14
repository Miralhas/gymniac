import Container from "@/components/container";
import { PropsWithChildren } from "react";

const WorkoutsLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full min-h-[200vh] flex overflow-hidden">
      <Container className="p-4 md:py-12 relative">
        {children}
      </Container>
    </section >
  )
}

export default WorkoutsLayout;
