const ProfileStats = () => {

  return (
    <div className="w-full grid grid-cols-2 justify-center md:grid-cols-4 gap-3 md:gap-6">
      <StatCard
        stat="85.5"
        description="Weight"
      />
      <StatCard
        stat="5"
        description="Streak"
      />
      <StatCard
        stat="Cutting"
        description="Mode"
      />
      <StatCard
        stat="40"
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
        <p className="text-sm md:text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="w-[20%] pb-[20%] absolute bottom-0 left-0 bg-emerald-800/90 block rounded-xl"></div>
      <div className="w-[20%] pb-[20%] absolute top-0 right-0 bg-emerald-800/90 block rounded-xl"></div>
    </div>
  )
}


export default ProfileStats;
