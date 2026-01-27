'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UpdateUserInput, updateUserSchema } from "@/lib/schemas/update-profile-schema";
import { ApiError } from "@/service/api-error";
import { useUpdateUser } from "@/service/user/mutations/use-update-user";
import { MODE } from "@/types/auth";
import { EMPTY_DEFAULT_SELECT } from "@/utils/constants";
import { capitalize } from "@/utils/string-utils";
import { useForm } from "@tanstack/react-form";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const defaultValues: UpdateUserInput = {
  username: "",
  confirmPassword: "",
  password: "",
  mode: undefined,
  weightGoal: 0,
}

const UpdateProfileForm = ({ handleOpen }: { handleOpen: () => void; }) => {
  const mutation = useUpdateUser();
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: updateUserSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const data = updateUserSchema.parse(value);
      mutation.mutate(data, {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          handleOpen();
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
      });
    },
  });

  return (
    <form
      id="update-profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {errorDetail && (
        <Alert variant="destructive" className="my-2 bg-red-800/10 border border-red-800/70 rounded-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold mb-1">Error updating exercise</AlertTitle>
          <AlertDescription className="font-light tracking-wider text-pretty">
            {errorDetail}
          </AlertDescription>
        </Alert>
      )}
      <FieldGroup className="gap-y-4">
        <form.Field name="username">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-y-1.5">
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
              <Field data-invalid={isInvalid} className="gap-y-1.5">
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
              <Field data-invalid={isInvalid} className="gap-y-1.5">
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
        <form.Field name="weightGoal">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-y-1.5">
                <FieldLabel htmlFor="confirmPassword">Weight Goal</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="82.3"
                  className="placeholder:text-xs placeholder:text-foreground/40"
                  value={(field.state.value === undefined || isNaN(field.state.value)) ? "" : field.state.value}
                  type="number"
                  aria-invalid={isInvalid}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>
        <form.Field
          name="mode"
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-y-1.5">
                <FieldLabel htmlFor={field.name}>Diet Mode</FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value === EMPTY_DEFAULT_SELECT ? undefined : field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={isInvalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Diet Mode" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={EMPTY_DEFAULT_SELECT}>None</SelectItem>
                    {MODE.map(m => (
                      <SelectItem key={m} value={m}>{capitalize(m)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.isPristine]}
        >
          {([isPristine]) => (
            <Field orientation="horizontal" className="w-full grid md:grid-cols-2 gap-2">
              <Button disabled={isPristine} type="submit" variant="cool" form="update-profile-form">
                Save Changes
              </Button>
              <Button disabled={isPristine} type="button" variant="secondary" onClick={() => form.reset()}>
                Reset
              </Button>
            </Field>
          )}
        </form.Subscribe>
      </FieldGroup>

    </form>
  )
}

export default UpdateProfileForm;
