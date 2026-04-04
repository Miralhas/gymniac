import { defaultDailyMacroParams, useGetUserDailyMacros } from "@/service/meals/queries/use-get-user-daily-macros";
import { MACRO_CONFIG } from "./macro-config";

const DailyMacros = ({ accessToken, from }: { from: string; accessToken: string; }) => {
  const query = useGetUserDailyMacros(accessToken, { ...defaultDailyMacroParams, from });

  if (query.isLoading) {
    return null;
  }

  if (query.isError) {
    return null;
  }

  return (
    <div className="space-y-2">
      {Object.entries(query.data!).map(([macro, value]) => {
        // @ts-expect-error: mapping from api
        const config = MACRO_CONFIG[macro.toUpperCase()];
        return (
          <div key={macro} className="flex">
            <div className="flex gap-1.5 items-center w-[90px]" key={macro}>
              <div className="rounded-full size-2" style={{ backgroundColor: config.color }} />
              <config.icon className="size-3.5" style={{ color: config.textColor }} />
              <p className="text-xs" style={{ color: config.textColor }}>{config.label}:</p>
            </div>
            <p className="text-xs text-foreground/90 ">{value}{config.suffix}</p>
          </div>
        )
      })}
    </div>
  )
}

export default DailyMacros;
