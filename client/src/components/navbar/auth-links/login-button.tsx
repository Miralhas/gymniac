import { Button } from "@/components/ui/button";
import { cn } from "@/utils/common-utils";
import Link from "next/link";

const LoginButton = ({ isLoading = false }: { isLoading?: boolean }) => {
  return (
    <Link href="/login">
      <Button
        variant="cool-secondary"
        size="sm"
        className={cn("transition-transform transform hover:-translate-y-0.5", { "animate-pulse": isLoading })}
      >
        Login
      </Button>
    </Link>
  )
}

export default LoginButton;
