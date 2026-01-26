import { getCurrentUser } from "@/utils/session";
import { mapRoles } from "@/utils/user-utils";
import { redirect } from "next/navigation";
import EditImage from "./edit-image";
import EditProfileButton from "./edit-profile-button";
import LogoutButton from "./logout-button";
import ProfileLinks from "./profile-links";
import ProfileStats from "./profile-stats";
import RoleBadge from "./role-badge";
import { env } from "@/env";

const ProfileHeader = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const imgURL = `${env.NEXT_PUBLIC_BASE_URL}/users/${user.id}/pfp#${new Date().getTime().toString()}`;

  return (
    <section className="w-full grid grid-rows-[max-content_max-content_min-content] md:grid-rows-[max-content_max-content] grid-cols-1 md:grid-cols-[min-content_1fr] bg-card/50 backdrop-blur-xl gap-y-4 md:gap-x-6 p-6 pb-0 rounded-xl border border-zinc-50/10">
      <div className="col-span-1 flex items-center justify-center row-start-1 row-span-1">
        <EditImage user={user} imgURL={imgURL} />
      </div>
      <div className="col-span-1 row-start-2 md:row-start-1 row-span-1 space-y-6 grid">
        <div className="flex flex-col md:flex-row w-full justify-between items-center md:items-baseline gap-4 md:self-start">
          <div className="space-y-0.5 overflow-hidden flex flex-col items-center md:block">
            <h1 className="text-3xl md:text-4xl font-bold text-white group">{user.username}</h1>
            <RoleBadge role={mapRoles(user.roles)} />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-4">
            <EditProfileButton />
            <LogoutButton />
          </div>
        </div>
        <ProfileStats />
      </div>
      <div className="row-start-3 col-span-2 pt-2 md:pt-4 w-full md:px-4 border-t-2">
        <ProfileLinks />
      </div>
    </section>
  )
}

export default ProfileHeader;
