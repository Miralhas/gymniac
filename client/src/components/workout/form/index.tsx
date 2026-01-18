'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { WorkoutInput, workoutSchema } from "@/lib/schemas/workout-schema";
import { ApiError } from "@/service/api-error";
import { useCreateWorkout } from "@/service/workout/mutations/use-create-workout";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ExercisesCombobox from "../exercises-combobox";
import { startOfToday } from "date-fns";

const defaultValues: WorkoutInput = {
  exercises: [{ slug: "", sets: [{ reps: 0, kg: 0 }] }],
  note: "",
}

const AddWorkoutForm = () => {
  const searchParams = useSearchParams()
  const mutation = useCreateWorkout();
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);
  const router = useRouter();

  const date = new Date(searchParams.get("date") ?? startOfToday());
  
  const form = useForm({
    defaultValues,
    validators: { onSubmit: workoutSchema },
    onSubmit: async ({ value, formApi }) => {
      mutation.mutate(value, {
        onSuccess: (w) => {
          form.reset();
          toast.success("Workout Created!");
          router.push(`/workouts/${w.id}`);
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
    onSubmitInvalid: () => {
      const InvalidInput = document.querySelector(
        '[aria-invalid="true"]',
      ) as HTMLInputElement

      InvalidInput?.focus();
    },
  })

  return (
    <>
      <form className="space-y-4"
        id="workout-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {errorDetail && (
          <Alert variant="destructive" className="my-2 bg-red-800/10 border border-red-800/70 rounded-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold mb-1">Error creating workout</AlertTitle>
            <AlertDescription className="font-light tracking-wider text-pretty">
              {errorDetail}
            </AlertDescription>
          </Alert>
        )}
        <form.Field
          name="exercises"
          mode="array"
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                <FieldGroup className="gap-4">
                  {field.state.value.map((_, index) => (
                    <Card key={index} className="rounded-sm border">
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center ">
                          <h3 className="text-lg leading-none">Exercise {index + 1}</h3>
                          {field.state.value.length > 1 && (
                            <Button
                              variant="ghost"
                              type="button"
                              size="icon-sm"
                              className="text-muted-foreground group"
                              onClick={() => field.removeValue(index)}
                              aria-label={`Remove exercise ${index + 1}`}
                            >
                              <Trash2Icon className="group-hover:text-red-800/90" />
                            </Button>
                          )}
                        </div>
                        <Separator />
                        <form.Field key={`index-exercise-slug-${index}`} name={`exercises[${index}].slug`}>
                          {(subField) => {
                            const isSubFieldInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                            return (
                              <Field className="gap-y-1.5" data-invalid={isSubFieldInvalid}>
                                <FieldLabel
                                  htmlFor={`workout-form-array-exercises-${index}`}
                                  className="text-foreground/80 text-sm text-[13px]"
                                >
                                  Exercise
                                </FieldLabel>
                                <ExercisesCombobox
                                  value={subField.state.value}
                                  setValue={subField.handleChange}
                                  isInvalid={isSubFieldInvalid}
                                />
                                {isSubFieldInvalid && (
                                  <FieldError
                                    errors={subField.state.meta.errors}
                                  />
                                )}
                              </Field>
                            )
                          }}
                        </form.Field>
                        <form.Field key={`index-sets-${index}`} name={`exercises[${index}].sets`}>
                          {(subField) => {
                            return (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-foreground/90 mb-2 shrink-0">Sets <span className="text-xs font-light text-foreground/80">({subField.state.value.length})</span></h3>
                                  <div className="border w-full relative bottom-0.5 flex-1" />
                                </div>
                                {subField.state.value.map((__, subIndex) => {
                                  return (
                                    <div key={`index-sets-${index}.reps-${subIndex}`} className="flex gap-3 items-center">
                                      <form.Field name={`exercises[${index}].sets[${subIndex}].kg`}>
                                        {(subSubField) => {
                                          const isSubSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                                          return (
                                            <Field className="gap-1">
                                              <FieldLabel className="text-foreground/70 text-xs">Weight (kg)</FieldLabel>
                                              <Input
                                                id={`workout-form-array-exercises-${index}-sets-${subIndex}-kg`}
                                                placeholder="12"
                                                aria-invalid={isSubSubFieldInvalid}
                                                name={subSubField.name}
                                                type="number"
                                                value={isNaN(subSubField.state.value) ? 0 : subSubField.state.value}
                                                onBlur={subSubField.handleBlur}
                                                onChange={(e) =>
                                                  subSubField.handleChange(isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)
                                                }
                                                min={0}
                                                step={.5}
                                              />
                                              {isSubSubFieldInvalid && (
                                                <FieldError
                                                  errors={subSubField.state.meta.errors}
                                                />
                                              )}
                                            </Field>
                                          )
                                        }}
                                      </form.Field>
                                      <form.Field name={`exercises[${index}].sets[${subIndex}].reps`}>
                                        {(subSubField) => {
                                          const isSubSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                                          return (
                                            <Field className="gap-1">
                                              <FieldLabel className="text-foreground/70 text-xs">Reps</FieldLabel>
                                              <Input
                                                id={`workout-form-array-exercises-${index}-sets-${subIndex}-reps`}
                                                placeholder="12"
                                                aria-invalid={isSubSubFieldInvalid}
                                                name={subSubField.name}
                                                type="number"
                                                value={isNaN(subSubField.state.value) ? 0 : subSubField.state.value}
                                                onBlur={subSubField.handleBlur}
                                                onChange={(e) =>
                                                  subSubField.handleChange(isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)
                                                }
                                                min={0}
                                              />
                                              {isSubSubFieldInvalid && (
                                                <FieldError
                                                  errors={subSubField.state.meta.errors}
                                                />
                                              )}
                                            </Field>
                                          )
                                        }}
                                      </form.Field>
                                      {subField.state.value.length > 1 && (
                                        <Button
                                          variant="ghost"
                                          type="button"
                                          size="none"
                                          className="text-muted-foreground group mt-5.75"
                                          onClick={() => subField.removeValue(subIndex)}
                                          aria-label={`Remove exercise ${index + 1} set`}
                                        >
                                          <Trash2Icon className="group-hover:text-red-800/90" />
                                        </Button>
                                      )}
                                    </div>
                                  )
                                })}
                                <Button
                                  type="button"
                                  variant="secondary"
                                  className="w-full max-w-30 col-span-full mt-3"
                                  onClick={() => subField.pushValue(defaultValues.exercises[0].sets[0])}
                                >
                                  <PlusIcon />
                                  Add set
                                </Button>
                              </div>
                            )
                          }}
                        </form.Field>
                      </CardContent>
                    </Card>
                  ))}
                </FieldGroup>
                <Button type="button" variant="secondary" className="w-full mt-4" onClick={() => field.pushValue(defaultValues.exercises[0])}>
                  <PlusIcon />
                  Add Exercise
                </Button>
              </div>
            )
          }}
        </form.Field>
        <form.Field name="note" mode="value">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <FieldGroup>
                <Card className="border">
                  <CardContent>
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className="text-base inline-flex items-center">Workout Note <span className="relative right-1 text-xs top-px text-foreground/80 font-light">(optional)</span></FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="How did the workout go?"
                          className="min-h-24 resize-none"
                          aria-invalid={isInvalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.state.value?.length ?? 0} characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        Add any notes about your workout session.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  </CardContent>
                </Card>
              </FieldGroup>
            )
          }}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.isPristine]}
        >
          {([isPristine]) => (
            <Field orientation="horizontal" className="w-full grid md:grid-cols-2 gap-4">
              <Button disabled={isPristine || mutation.isPending} type="submit" variant="cool" form="workout-form">
                Submit
              </Button>
              <Button disabled={isPristine || mutation.isPending} type="button" variant="secondary" onClick={() => form.reset()}>
                Reset
              </Button>
            </Field>
          )}
        </form.Subscribe>
      </form>
    </>
  )
}

export default AddWorkoutForm;
