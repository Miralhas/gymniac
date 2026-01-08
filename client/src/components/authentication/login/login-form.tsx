'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
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
import { useAuthContext } from "@/contexts/auth-context";
import { loginSchema } from "@/lib/schemas/login-schema";
import { ApiError } from "@/service/api-error";
import { useLoginMutation } from "@/service/authentication/mutations/use-login-mutation";
import { useForm, useStore } from "@tanstack/react-form";
import { AlertCircle, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const mutation = useLoginMutation();
  const { login } = useAuthContext();
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      mutation.mutate(value, {
        onSuccess: async (tokens) => await login(tokens),
        onError: (error) => {
          if (error instanceof ApiError) {
            setErrorDetail(error.detail);
            if (error.errors) {
              Object.entries(error.errors).map(([key, value]) => {
                // @ts-expect-error typescript can't map the type of the errors provided by the API.
                formApi.fieldInfo[key].instance?.setErrorMap({onSubmit: {message: value}})
              })
            }
          } else {
            setErrorDetail(error.message);
          }
        }
      });
    },
  });

  const isPending = form.state.isSubmitting || mutation.isPending;

  const store = useStore(form.store);

  return (
    <Card className="w-full max-w-md gap-2 py-4 z-999 relative rounded-sm">
      <CardHeader>
        <CardTitle className="">
          <Button variant="link" className="text-foreground hover:text-primary duration-200 ease-in-out transition-colors" asChild size="icon-sm">
            <Link href="/" ><MoveLeftIcon className="size-5.5" /></Link>
          </Button>
          <h1 className="text-center text-2xl font-semibold leading-2">Sign In</h1>
        </CardTitle>
        <CardDescription className="sr-only">Please fill in your details below</CardDescription>
        {errorDetail && (
          <Alert variant="destructive" className="bg-red-800/10 border border-red-800/70 rounded-sm text-red-600 mt-1">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold mb-1">Error Logging In</AlertTitle>
            <AlertDescription className="font-light tracking-wider">
              {errorDetail}.
            </AlertDescription>
          </Alert>
        )}
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="••••••••"
                      type="password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <Field orientation="vertical">
              <Button type="submit" variant="cool" form="login-form" disabled={store.isPristine || isPending}>
                {isPending ? <span className="animate-pulse">Logging in...</span> : "Login"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <div className="flex justify-center text-sm gap-1 font-medium leading-relaxed">
          Don&apos;t have an account? <Link href="/signup" className="transition-colors duration-200 hover:text-primary underline">Sign up</Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm;
