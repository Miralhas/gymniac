import ProfileInfoGrid from "@/components/profile/info";
import { getCurrentUser } from "@/utils/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Profile"
};

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect('/login')

  return (
    <ProfileInfoGrid user={user} />
  )
}

export default ProfilePage;
