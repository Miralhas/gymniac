'use client'

import { useAuthContext } from "@/contexts/auth-context";
import { useGlobalLoginContext } from "@/contexts/global-login-context";
import { cn } from "@/utils/common-utils";
import { type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";
import { buttonVariants } from "./button";

const AuthenticatedButton = ({
  onClick,
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot.Root : "button";
  const { authState } = useAuthContext();
  const { handleOpen } = useGlobalLoginContext();
  const isAuthenticated = !!authState?.user;

  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      handleOpen();
      return;
    }
    onClick?.(e);
  }, [isAuthenticated, handleOpen, onClick]);

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      onClick={handleClick}
    />
  )
}

export default AuthenticatedButton;
