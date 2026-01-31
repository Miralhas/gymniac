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
import { signUpSchema } from "@/lib/schemas/signup-schema";
import { ApiError } from "@/service/api-error";
import { useLoginMutation } from "@/service/authentication/mutations/use-login-mutation";
import { useSignUpMutation } from "@/service/authentication/mutations/use-signup-mutation";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const defaultValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
}

const SignupForm = () => {
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);
  const signUpMutation = useSignUpMutation();
  const loginMutation = useLoginMutation();
  const { login } = useAuthContext();

  const form = useForm({
    defaultValues,
    validators: { onSubmit: signUpSchema },
    onSubmit: async ({ value, formApi }) => {
      signUpMutation.mutate(value, {
        onSuccess: () => {
          loginMutation.mutate(value, {
            onSuccess: async (tokens) => await login(tokens)
          })
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            setErrorDetail(error.detail);
            if (error.errors) {
              Object.entries(error.errors).map(([key, value]) => {
                // @ts-expect-error typescript can't map the type of the errors provided by the API.
                formApi.fieldInfo[key].instance?.setErrorMap({ onSubmit: { message: value } })
              })
            }
          } else {
            setErrorDetail(error.message);
          }
        }
      })
    },
  });

  const isPending = form.state.isSubmitting || signUpMutation.isPending;

  return (
    <Card className="w-full max-w-md gap-2 py-4 z-999 relative rounded-sm">
      <CardHeader>
        <CardTitle className="">
          <Button variant="link" className="text-foreground hover:text-primary duration-200 ease-in-out transition-colors" asChild size="icon-sm">
            <Link href="/" ><MoveLeftIcon className="size-5.5" /></Link>
          </Button>
          <h1 className="text-center text-lg md:text-2xl font-semibold ">Create your account</h1>
        </CardTitle>
        <CardDescription className="sr-only">Create your account</CardDescription>
        {errorDetail && (
          <Alert variant="destructive" className="my-2 bg-red-800/10 border border-red-800/70 rounded-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold mb-1">Error Logging In</AlertTitle>
            <AlertDescription className="font-light tracking-wider text-pretty">
              {errorDetail}
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-y-5">
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
            <form.Field name="username">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Sonbaty"
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
            <form.Field name="confirmPassword">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
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
              <Button type="submit" variant="cool" form="signup-form" disabled={isPending}>
                {isPending ? <span className="animate-pulse">Signin in...</span> : "Sign in"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <div className="flex justify-center text-sm gap-1 font-medium leading-relaxed">
          Already have an account? <Link href="/login" className="transition-colors duration-200 hover:text-primary underline">Sign in</Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignupForm;
