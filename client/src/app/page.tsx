import Logout from "@/components/logout";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value

  return <Logout token={token} />
}
