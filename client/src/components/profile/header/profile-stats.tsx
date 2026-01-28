'use client'

import { useGetUserInfo } from "@/service/user/queries/use-get-user-info";
import { capitalize } from "@/utils/string-utils";

const ProfileStats = ({ accessToken }: { accessToken: string }) => {
  const query = useGetUserInfo(accessToken);
  const info = query.data;

  const mode = info?.mode ? capitalize(info?.mode) : "N/A"


  return (
    <div className="w-full grid grid-cols-2 justify-center md:grid-cols-4 gap-3 md:gap-6">
      <StatCard
        stat={info?.currentWeight?.toString() ?? "N/A"}
        description="Weight"
      />
      <StatCard
        stat={info?.weightGoal?.toString() ?? "N/A"}
        description="Weight Goal"
      />
      <StatCard
        stat={mode}
        description="Mode"
      />
      <StatCard
        stat={info?.totalWorkouts?.toString() ?? "0"}
        description="Total"
      />
    </div>
  )
}

const StatCard = ({ description, stat }: { stat: string; description: string }) => {
  return (
    <div className="relative p-px">
      <div className="col-span-1 bg-card rounded-xl border border-zinc-500/25 py-2.5 px-4 flex flex-col items-center md:items-start relative z-50">
        <p className="md:text-xl font-bold whitespace-nowrap">{stat}</p>
        <p className="text-sm md:text-lg text-muted-foreground whitespace-nowrap">{description}</p>
      </div>
      <div className="w-[20%] pb-[20%] absolute bottom-0 left-0 bg-emerald-800/90 block rounded-xl"></div>
      <div className="w-[20%] pb-[20%] absolute top-0 right-0 bg-emerald-800/90 block rounded-xl"></div>
    </div>
  )
}


export default ProfileStats;
