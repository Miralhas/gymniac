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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { WorkoutExerciseInput, workoutExerciseSchema } from "@/lib/schemas/workout-exercise-schema";
import { useUpdateWorkoutExercise } from "@/service/workout/mutations/use-update-workout-exercise";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ExercisesCombobox from "../exercises-combobox";
import { Workout, WorkoutExercise } from "@/types/workout";
import { ApiError } from "@/service/api-error";

type Props = {
  defaultValues: WorkoutExerciseInput;
  workoutId: Workout["id"],
  workoutExerciseId: WorkoutExercise["id"];
  handleMode: (id: WorkoutExercise["id"] | undefined) => void;
}

const UpdateExerciseForm = ({ defaultValues, workoutExerciseId, workoutId, handleMode }: Props) => {
  const mutation = useUpdateWorkoutExercise({ workoutId, workoutExerciseId });
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);

  const form = useForm({
    defaultValues,
    validators: { onSubmit: workoutExerciseSchema },
    onSubmit: async ({ value, formApi }) => {
      mutation.mutate(value, {
        onSuccess: () => { toast.success("Exercise updated successfully!"); form.reset(); handleMode(undefined) },
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
            <AlertTitle className="font-semibold mb-1">Something happened!</AlertTitle>
            <AlertDescription className="font-light tracking-wider text-pretty">
              {errorDetail}
            </AlertDescription>
          </Alert>
        )}

        <Card className="rounded-sm border">
          <CardContent className="space-y-4">
            <form.Field name={`slug`}>
              {(field) => {
                const isSubFieldInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field className="gap-y-1.5" data-invalid={isSubFieldInvalid}>
                    <FieldLabel
                      htmlFor={`workout-form-array-exercises`}
                      className="text-foreground/80 text-sm text-[13px]"
                    >
                      Exercise
                    </FieldLabel>
                    <ExercisesCombobox
                      value={field.state.value}
                      setValue={field.handleChange}
                      isInvalid={isSubFieldInvalid}
                    />
                    {isSubFieldInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field name={`sets`}>
              {(field) => {
                return (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-foreground/90 mb-2 shrink-0">Sets <span className="text-xs font-light text-foreground/80">({field.state.value.length})</span></h3>
                      <div className="border w-full relative bottom-0.5 flex-1" />
                    </div>
                    {field.state.value.map((__, index) => {
                      return (
                        <div key={`index-sets.reps-${index}`} className="flex gap-3 items-center">
                          <form.Field name={`sets[${index}].kg`}>
                            {(subSubField) => {
                              const isSubSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                              return (
                                <Field className="gap-1">
                                  <FieldLabel className="text-foreground/70 text-xs">Weight (kg)</FieldLabel>
                                  <Input
                                    id={`workout-form-array-exercises-${index}-sets-${index}-kg`}
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
                          <form.Field name={`sets[${index}].reps`}>
                            {(subSubField) => {
                              const isSubSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                              return (
                                <Field className="gap-1">
                                  <FieldLabel className="text-foreground/70 text-xs">Reps</FieldLabel>
                                  <Input
                                    id={`workout-form-array-exercises-sets-${index}-reps`}
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
                          {field.state.value.length > 1 && (
                            <Button
                              variant="ghost"
                              type="button"
                              size="none"
                              className="text-muted-foreground group mt-5.75"
                              onClick={() => field.removeValue(index)}
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
                      onClick={() => field.pushValue(defaultValues.sets[defaultValues.sets.length - 1])}
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
      </form >
    </>
  )
}

export default UpdateExerciseForm;
