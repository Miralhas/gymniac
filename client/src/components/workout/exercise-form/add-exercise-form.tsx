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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { WorkoutExerciseArrayInput, workoutExerciseSchemaArray } from "@/lib/schemas/workout-exercise-schema";
import { ApiError } from "@/service/api-error";
import { useAddWorkoutExercises } from "@/service/workout/mutations/use-add-workout-exercises";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ExercisesCombobox from "../exercises-combobox";
import { Workout } from "@/types/workout";

const defaultValues: WorkoutExerciseArrayInput = {
  exercises: [{ slug: "", sets: [{ reps: 0, kg: 0 }] }],
}

const AddExerciseForm = ({ id, handleMode }: { id: Workout["id"]; handleMode: () => void; }) => {
  const mutation = useAddWorkoutExercises({ id });
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);

  const form = useForm({
    defaultValues,
    validators: { onSubmit: workoutExerciseSchemaArray },
    onSubmit: async ({ value, formApi }) => {
      mutation.mutate(value, {
        onSuccess: () => {
          toast.success("Exercises added successfully!")
          form.reset();
          handleMode()
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
            <AlertTitle className="font-semibold mb-1">Error adding exercises</AlertTitle>
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

export default AddExerciseForm;
