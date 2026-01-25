import Container from "@/components/container";
import ProfileHeader from "@/components/profile/header";
import { PropsWithChildren } from "react";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container className="p-4 pt-4 md:pt-8">
      <ProfileHeader />
      <section className="w-full grid rounded-2xl bg-secondary/10">
        {children}
      </section>
    </Container>
  )
}

export default ProfileLayout;
