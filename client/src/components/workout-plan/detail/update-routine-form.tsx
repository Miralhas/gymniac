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
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ExercisesCombobox from "@/components/workout/exercises-combobox";
import { WorkoutRoutineInput, workoutRoutineSchema } from "@/lib/schemas/workout-plan-schema";
import { ApiError } from "@/service/api-error";
import { useUpdateRoutine } from "@/service/workout-plan/mutations/use-update-routine";
import { WorkoutPlan, WorkoutRoutine } from "@/types/workout-plan";
import { EMPTY_DEFAULT_SELECT } from "@/utils/constants";
import { DAYS_OF_WEEK } from "@/utils/date-utils";
import { capitalize } from "@/utils/string-utils";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const invalidFocus = () => {
  const InvalidInput = document.querySelector(
    '[aria-invalid="true"]',
  ) as HTMLInputElement

  InvalidInput?.focus();
}

type Props = {
  handleEditMode: () => void;
  routine: WorkoutRoutine;
  planSlug: WorkoutPlan["slug"];
}

const UpdateRoutineForm = ({ routine, handleEditMode, planSlug }: Props) => {
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);
  const cardRef = useRef<HTMLDivElement>(null);
  const mutation = useUpdateRoutine();

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, []);

  const defaultValues: WorkoutRoutineInput = {
    name: routine.name,
    desirableDayOfWeek: routine.desirableDayOfWeek,
    exercises: routine.exercises.map(r => ({ desirableReps: r.desirableReps, desirableSets: r.desirableSets, slug: r.exercise.slug })),
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: workoutRoutineSchema,
    },
    onSubmitInvalid: () => invalidFocus(),
    onSubmit: async ({ value, formApi }) => {
      mutation.mutate({ data: value, id: routine.id, slug: planSlug }, {
        onSuccess: () => {
          toast.success("Workout Plan updated successfully!")
          handleEditMode();
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            setErrorDetail(error.detail);
            if (error.errors) {
              Object.entries(error.errors).map(([key, value]) => {
                // @ts-expect-error typescript can't map the type of the errors provided by the API.
                formApi.fieldInfo[key].instance?.setErrorMap({ onSubmit: { message: value } })
              });
            }

            // server-side focus
            requestAnimationFrame(() => {
              invalidFocus();
            })
          } else {
            setErrorDetail(error.message);
          }
        }
      });
    },
  });

  return (
    <form className="space-y-4"
      id="update-routine-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {errorDetail && (
        <Alert variant="destructive" className="my-2 bg-red-800/10 border border-red-800/70 rounded-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold mb-1">Error creating Workout Plan</AlertTitle>
          <AlertDescription className="font-light tracking-wider text-pretty">
            {errorDetail}
          </AlertDescription>
        </Alert>
      )}
      <FieldGroup>
        <Card className="rounded-sm border bg-card/60 gap-0 pt-4.5" ref={cardRef}>
          <CardHeader className="justify-start">
            <Button variant="pure" size="none" onClick={handleEditMode}>
              <XIcon className="size-5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <form.Field
              name="name"
            >
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="gap-y-1.5">
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Chest Day"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            <form.Field
              name="desirableDayOfWeek"
            >
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="gap-y-1.5">
                    <FieldLabel htmlFor={field.name}>Desirable Day of the Week</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value === EMPTY_DEFAULT_SELECT ? "" : field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Monday" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={EMPTY_DEFAULT_SELECT}>None</SelectItem>
                        {DAYS_OF_WEEK.map((day, dayIndex) => (
                          <SelectItem key={dayIndex} value={day}>{capitalize(day)}</SelectItem>
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
            <form.Field
              name="exercises"
            >
              {(subField) => {
                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-foreground/90 mb-2 shrink-0 text-base">Exercises <span className="text-xs font-light text-foreground/80">({subField.state.value.length})</span></h3>
                      <div className="border w-full relative bottom-0.5 flex-1" />
                    </div>
                    {subField.state.value.map((__, index) => {
                      return (
                        <div key={`index${index}`} className="flex flex-col md:flex-row gap-2 gap-y-5 md:items-baseline-last">
                          <form.Field key={`index-exercise-slug-${index}`} name={`exercises[${index}].slug`}>
                            {(subSubField) => {
                              const isSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                              return (
                                <Field className="gap-y-1.5 w-full md:min-w-[300px]" data-invalid={isSubFieldInvalid}>
                                  <FieldLabel
                                    htmlFor={`workout-form-array-exercises-${index}`}
                                    className="text-foreground/80 text-sm text-[13px]"
                                  >
                                    Exercise {index + 1}
                                  </FieldLabel>
                                  <ExercisesCombobox
                                    value={subSubField.state.value}
                                    setValue={subSubField.handleChange}
                                    isInvalid={isSubFieldInvalid}
                                  />
                                  {isSubFieldInvalid && (
                                    <FieldError
                                      errors={subSubField.state.meta.errors}
                                    />
                                  )}
                                </Field>
                              )
                            }}
                          </form.Field>
                          <div className="flex gap-3 items-center relative md:bottom-0.5">
                            <form.Field name={`exercises[${index}].desirableSets`}>
                              {(subSubField) => {
                                const isSubSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                                return (
                                  <Field className="gap-1">
                                    <FieldLabel className="text-foreground/70 text-xs">Sets</FieldLabel>
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
                            <form.Field name={`exercises[${index}].desirableReps`}>
                              {(subSubField) => {
                                const isSubSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                                return (
                                  <Field className="gap-1">
                                    <FieldLabel className="text-foreground/70 text-xs">Reps</FieldLabel>
                                    <Input
                                      id={`workout-form-array-exercises-${index}-sets-${index}-reps`}
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
                          </div>
                          {subField.state.value.length > 1 && (
                            <Button
                              variant="pure"
                              type="button"
                              size="none"
                              className="text-muted-foreground group md:relative md:top-px"
                              onClick={() => subField.removeValue(index)}
                              aria-label={`Remove exercise ${index + 1}`}
                            >
                              <Trash2Icon className="group-hover:text-red-800/90" />
                            </Button>
                          )}
                          <Separator className="md:hidden" />
                        </div>
                      )
                    })}
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full max-w-35 col-span-full mt-3"
                      onClick={() => subField.pushValue({ desirableReps: 0, desirableSets: 0, slug: "" })}
                    >
                      <PlusIcon />
                      Add Exercise
                    </Button>
                  </div>
                )
              }}
            </form.Field>
          </CardContent>
          <CardFooter>
            <form.Subscribe
              selector={(state) => [state.isPristine]}
            >
              {([isPristine]) => (
                <Field orientation="horizontal" className="w-full grid md:grid-cols-2 gap-4">
                  <Button disabled={isPristine} type="submit" variant="cool" form="update-routine-form">
                    Submit
                  </Button>
                  <Button disabled={isPristine} type="button" variant="secondary" onClick={() => form.reset()}>
                    Reset
                  </Button>
                </Field>
              )}
            </form.Subscribe>
          </CardFooter>
        </Card>

      </FieldGroup>
    </form >
  )
}

export default UpdateRoutineForm;
