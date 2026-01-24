import Container from "@/components/container";
import { PropsWithChildren } from "react";

const AddWorkoutLayout = ({children}: PropsWithChildren) => {
  return (
    <Container className="max-w-[1024px]">
      {children}
    </Container>
  )
}

export default AddWorkoutLayout;
