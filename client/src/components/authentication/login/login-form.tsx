'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/schemas/login-schema";
import { loginAction } from "@/service/authentication/actions/login-action";
import { useLoginMutation } from "@/service/authentication/mutations/use-login-mutation";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";

const LoginForm = () => {
  const mutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: loginSchema
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value, {
        onSuccess: async (tokens) => {
          await loginAction(undefined, tokens);
        }
      })
    },
  });

  const isPending = form.state.isSubmitting || mutation.isPending;

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
              <Button type="submit" form="login-form" disabled={isPending}>
                {isPending ? <span className="animate-pulse">Logging in...</span> : "Login"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <div className="flex justify-center text-sm gap-1 font-medium leading-relaxed">
          Don&apos;t have an account? <Link href="/signup" className="transition-colors duration-200 hover:text-primary/80 underline">Sign up</Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm;
