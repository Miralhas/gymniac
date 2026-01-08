'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/service/authentication/actions/login-action";
import { signin } from "@/service/authentication/api/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { loginSchema } from "@/lib/schemas/login-schema";

const LoginForm = () => {
  const router = useRouter();

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!email || !password) return;
  //   const tokens = await signin({ email, password });
  //   await loginAction(undefined, tokens);
  //   router.push("/");
  // }


  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: loginSchema
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    },
  })

  return (
    <Card className="w-full max-w-md gap-2 pb-4 z-999 relative rounded-sm">
      <CardHeader>
        <CardTitle>
          <h1 className="text-center text-2xl font-semibold ">Sign In</h1>
        </CardTitle>
        <CardDescription className="sr-only">Please fill in your details below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="">
            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="example@email.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field name="password">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="email">Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="••••••••"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <Field orientation="vertical">
              <Button type="submit" form="login-form">Sign In</Button>
            </Field>
          </FieldGroup>
        </form>
        <div className="flex justify-center text-sm gap-1 font-medium leading-relaxed">
          Don&apos;t have an account? <Link href="/signup" className="transition-colors duration-200 hover:text-primary/80 underline">Sign up</Link>
        </div>
      </CardContent>
    </Card>
    // <form onSubmit={handleSubmit} className="space-y-3">
    //   <div className="flex flex-col gap-2">
    //     <label htmlFor="email" className="text-zinc-300 text-sm">Email</label>
    //     <input
    //       id="email"
    //       type="email"
    //       className="bg-emerald-900/30 border-emerald-900 border rounded-md placeholder:text-muted-foreground placeholder:text-xs placeholder:font-medium ps-2 h-8" placeholder="example@email.com"
    //       onChange={(e) => setEmail(e.currentTarget.value)}
    //     />
    //   </div>
    //   <div className="flex flex-col gap-2">
    //     <label htmlFor="password" className="text-zinc-300 text-sm">Password</label>
    //     <input
    //       id="password"
    //       type="password"
    //       className="bg-emerald-900/30 border-emerald-900 border rounded-md placeholder:text-muted-foreground placeholder:text-xs placeholder:font-medium ps-2 h-8" placeholder="••••••••"
    //       onChange={(e) => setPassword(e.currentTarget.value)}
    //     />
    //   </div>
    //   <div className="grid mt-6">
    //     <button type="submit" className="cursor-pointer border border-emerald-700 px-4 py-1 rounded-md text-sm font-medium text-zinc-300 bg-emerald-900/30 hover:text-zinc-100">Log in</button>
    //   </div>
    // </form>
  )
}

export default LoginForm;
