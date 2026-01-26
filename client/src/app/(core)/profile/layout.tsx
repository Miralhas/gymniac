import Container from "@/components/container";
import ProfileHeader from "@/components/profile/header";
import { PropsWithChildren } from "react";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container className="p-4 pt-4 md:pt-8 space-y-6">
      <ProfileHeader />
      <section className="bg-card/50 backdrop-blur-xl p-6 rounded-xl border border-zinc-50/10">
        {children}
      </section>
    </Container>
  )
}

export default ProfileLayout;
