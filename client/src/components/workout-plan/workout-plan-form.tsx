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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { WorkoutPlanInput, workoutPlanSchema } from "@/lib/schemas/workout-plan-schema";
import { ApiError } from "@/service/api-error";
import { useCreateWorkoutPlan } from "@/service/workout-plan/mutations/use-create-workout-plan";
import { EMPTY_DEFAULT_SELECT } from "@/utils/constants";
import { DAYS_OF_WEEK } from "@/utils/date-utils";
import { capitalize } from "@/utils/string-utils";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import ExercisesCombobox from "../workout/exercises-combobox";

// const defaultValues: WorkoutPlanInput = {
//   description: "",
//   name: "",
//   routines: [
//     {
//       name: "",
//       desirableDayOfWeek: EMPTY_DEFAULT_SELECT,
//       exercises: [{ reps: 0, sets: 0, slug: "" }],
//     }
//   ],
// }

const defaultValues: WorkoutPlanInput = {
  "description": "6 days per week workout plan (NO BETAS ALLOWED ⛔️)",
  "name": "ULTRA GIGA CHAD WORKOUT PLAN (ONLY FOR MONSTERS 😤)",
  "routines": [
    {
      "name": "CHEST DAY LET'S GOOOOOOOO",
      "desirableDayOfWeek": "MONDAY",
      "exercises": [
        {
          "desirableSets": 12,
          "desirableReps": 6,
          "slug": "incline-bench-press"
        },
        {
          "desirableSets": 12,
          "desirableReps": 6,
          "slug": "flat-bench-press"
        },
        {
          "desirableSets": 12,
          "desirableReps": 4,
          "slug": "triceps-pushdown"
        },
        {
          "desirableSets": 12,
          "desirableReps": 4,
          "slug": "lateral-raise"
        }
      ]
    },
    {
      "name": "Back Day",
      "desirableDayOfWeek": "TUESDAY",
      "exercises": [
        {
          "desirableSets": 12,
          "desirableReps": 5,
          "slug": "chest-supported-row-machine"
        },
        {
          "desirableSets": 12,
          "desirableReps": 5,
          "slug": "lat-pulldown"
        },
        {
          "desirableSets": 12,
          "desirableReps": 4,
          "slug": "unilateral-biceps-curl"
        },
        {
          "desirableSets": 12,
          "desirableReps": 4,
          "slug": "lateral-raise"
        }
      ]
    },
    {
      "name": "Arms Day",
      "desirableDayOfWeek": "WEDNESDAY",
      "exercises": [
        {
          "desirableSets": 12,
          "desirableReps": 4,
          "slug": "unilateral-french-triceps"
        },
        {
          "desirableSets": 12,
          "desirableReps": 4,
          "slug": "unilateral-biceps-curl"
        },
        {
          "desirableSets": 12,
          "desirableReps": 4,
          "slug": "lateral-raise"
        },
        {
          "desirableSets": 12,
          "desirableReps": 4,
          "slug": "hammer-curl"
        }
      ]
    }
  ]
}

const invalidFocus = () => {
  const InvalidInput = document.querySelector(
    '[aria-invalid="true"]',
  ) as HTMLInputElement

  InvalidInput?.focus();
}

const WorkoutPlanForm = () => {
  const mutation = useCreateWorkoutPlan();
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: workoutPlanSchema,
    },
    onSubmitInvalid: () => invalidFocus(),
    onSubmit: async ({ value, formApi }) => {
      mutation.mutate(value, {
        onSuccess: (w) => {
          toast.success("Workout Plan created successfully!")
          form.reset();
          router.push(`/workout-plans/${w.slug}`);
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
      id="workout-plan-form"
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
        <Card className="rounded-sm border pt-1 bg-card/60">
          <CardContent className="space-y-4 p-4">
            <form.Field
              name="name"
            >
              {(field) => {
                const isInvalid = !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Name of the workout plan"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <Separator />

            <form.Field
              name="description"
            >
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="For people that only have 30 minutes/day to workout."
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value?.length ?? 0} characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </CardContent>
        </Card>
        <form.Field
          name="routines"
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                <FieldGroup className="gap-4">
                  {field.state.value.map((_, index) => (
                    <Card key={index} className="rounded-sm border pt-1 bg-card/60">
                      <CardContent className="space-y-4 p-4">
                        <div className="flex justify-between items-center ">
                          <h3 className="text-lg leading-none">Day {index + 1}</h3>
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
                        <div className="grid md:grid-cols-2 gap-3">
                          <form.Field
                            name={`routines[${index}].name`}
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
                            name={`routines[${index}].desirableDayOfWeek`}
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
                        </div>
                        <form.Field key={`index-sets-${index}`} name={`routines[${index}].exercises`}>
                          {(subField) => {
                            return (
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-foreground/90 mb-2 shrink-0 text-base">Exercises <span className="text-xs font-light text-foreground/80">({subField.state.value.length})</span></h3>
                                  <div className="border w-full relative bottom-0.5 flex-1" />
                                </div>
                                {subField.state.value.map((__, subIndex) => {
                                  return (
                                    <div key={`index${index}${subIndex}`} className="flex flex-col md:flex-row gap-2 gap-y-5 md:items-baseline-last">
                                      <form.Field key={`index-exercise-slug-${index}`} name={`routines[${index}].exercises[${subIndex}].slug`}>
                                        {(subSubField) => {
                                          const isSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                                          return (
                                            <Field className="gap-y-1.5 w-full md:min-w-[300px]" data-invalid={isSubFieldInvalid}>
                                              <FieldLabel
                                                htmlFor={`workout-form-array-exercises-${index}`}
                                                className="text-foreground/80 text-sm text-[13px]"
                                              >
                                                Exercise {subIndex + 1}
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
                                        <form.Field name={`routines[${index}].exercises[${subIndex}].desirableSets`}>
                                          {(subSubField) => {
                                            const isSubSubFieldInvalid = subSubField.state.meta.isTouched && !subSubField.state.meta.isValid
                                            return (
                                              <Field className="gap-1">
                                                <FieldLabel className="text-foreground/70 text-xs">Sets</FieldLabel>
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
                                        <form.Field name={`routines[${index}].exercises[${subIndex}].desirableReps`}>
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
                                      </div>
                                      {subField.state.value.length > 1 && (
                                        <Button
                                          variant="pure"
                                          type="button"
                                          size="none"
                                          className="text-muted-foreground group md:relative md:top-px"
                                          onClick={() => subField.removeValue(subIndex)}
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
                                  onClick={() => subField.pushValue(defaultValues.routines[0].exercises[0])}
                                >
                                  <PlusIcon />
                                  Add Exercise
                                </Button>
                              </div>
                            )
                          }}
                        </form.Field>
                      </CardContent>
                    </Card>
                  ))}
                </FieldGroup>
                <Button type="button" variant="secondary" className="w-full mt-4" onClick={() => field.pushValue(defaultValues.routines[0])}>
                  <PlusIcon />
                  Add Routine Day
                </Button>
              </div>
            )
          }}
        </form.Field>
      </FieldGroup>
      <form.Subscribe
        selector={(state) => [state.isPristine]}
      >
        {([isPristine]) => (
          <Field orientation="horizontal" className="w-full grid md:grid-cols-2 gap-2">
            <Button type="submit" variant="cool" form="workout-plan-form">
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={() => form.reset()}>
              Reset
            </Button>
          </Field>
        )}
      </form.Subscribe>
    </form>
  )
}

export default WorkoutPlanForm;