"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import AuthButton from "./authentication/auth-button"

const CardExample = () => {
  const { authState, isLoading } = useAuthContext();

  return (
    <Card className="relative w-full max-w-sm overflow-hidden mx-auto pt-0 z-50">
      <div className="bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
      <img
        src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Photo by mymind on Unsplash"
        title="Photo by mymind on Unsplash"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />
      <CardHeader>
        {(authState && !isLoading) ? (
          <>
            <CardTitle>User Authenticated</CardTitle>
            <CardDescription>
              <pre className="bg-secondary p-2 px-4 rounded-md text-foreground/80 border border-primary/50">
                <code>
                  {JSON.stringify(authState?.user, null, 2)}
                </code>
              </pre>
            </CardDescription>
          </>
        ) : (
          <CardTitle>Not Authenticated</CardTitle>
        )}
      </CardHeader>
      <CardFooter className="space-x-2.5">
        <AuthButton />
        <Button size="sm">Default Variant</Button>
        <Badge variant="secondary" className="ml-auto">
          Warning
        </Badge>
      </CardFooter>
    </Card>
  )
}

export default CardExample;