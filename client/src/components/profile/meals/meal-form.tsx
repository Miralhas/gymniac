'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { MacronutrientInput, MealInput, mealSchema } from "@/lib/schemas/meal-schema";
import { ApiError } from "@/service/api-error";
import { useAddMeal } from "@/service/meals/mutations/use-add-meal";
import { Meal } from "@/types/meal";
import { useForm } from "@tanstack/react-form";
import { AlertCircle, PlusIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { MACRO_CONFIG } from "./macro-config";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type PostProps = {
  mode: "POST";
  handleOpen: () => void;
}

type PutProps = {
  mode: "PUT",
  meal: Meal;
  handleOpen: () => void;
}

type Props =
  | PostProps
  | PutProps;

const defaultNutrients: MacronutrientInput[] = [
  { nutrient: "PROTEIN", grams: 0 },
  { nutrient: "FAT", grams: 0 },
  { nutrient: "CARBOHYDRATE", grams: 0 },
]

const MealForm = (props: Props) => {
  const { handleOpen, mode } = props;
  const isPut = mode === "PUT";
  const postMutation = useAddMeal();
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);
  const router = useRouter();

  const defaultValues: MealInput = {
    name: isPut ? props.meal.name : "",
    kcal: isPut ? props.meal.kcal : 0,
    macros: isPut ? props.meal.macros : defaultNutrients,
  }

  // eslint-disable-next-line
  const handleError = (error: Error, formApi: any) => {
    if (error instanceof ApiError) {
      setErrorDetail(error.detail);
      if (error.errors) {
        Object.entries(error.errors).map(([key, value]) => {
          formApi.fieldInfo[key].instance?.setErrorMap({ onSubmit: { message: value } })
        })
      }
    } else {
      setErrorDetail(error.message);
    }
  }

  // eslint-disable-next-line
  const handlePost = (value: MealInput, formApi: any) => {
    if (isPut) return;
    postMutation.mutate(value, {
      onSuccess: () => {
        toast.success("Exercise added successfully!");
        form.reset();
        handleOpen();
      },
      onError: (error) => handleError(error, formApi)
    });
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: mealSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      switch (mode) {
        case "POST": handlePost(value, formApi); break;
        // case "PUT": handlePut(value, formApi); break;
      }
    },
  });

  return (
    <form
      className="space-y-3"
      id="meal-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {errorDetail && (
        <Alert variant="destructive" className="my-2 bg-red-800/10 border border-red-800/70 rounded-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold mb-1">Error adding meal</AlertTitle>
          <AlertDescription className="font-light tracking-wider text-pretty">
            {errorDetail}
          </AlertDescription>
        </Alert>
      )}
      <FieldGroup className="gap-y-2.5">
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
                  placeholder="Amburge"
                  autoComplete="off"
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        <form.Field
          name="kcal"
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-y-1.5">
                <FieldLabel htmlFor={field.name}>Kcal</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="30"
                  className="placeholder:text-xs placeholder:text-foreground/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                  value={isNaN(field.state.value) ? 0 : field.state.value}
                  type="number"
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)
                  }
                  step={1}
                  aria-invalid={isInvalid}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}
        </form.Field>

        <form.Field
          name="macros"
          mode="array"
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            const hasProteinMacro = field.state.value.some(macro => macro.nutrient === "PROTEIN");
            const hasCarbMacro = field.state.value.some(macro => macro.nutrient === "CARBOHYDRATE");
            const hasFatMacro = field.state.value.some(macro => macro.nutrient === "FAT");

            return (
              <FieldSet className="gap-4" data-invalid={isInvalid}>
                <FieldLegend variant="label" className="mb-1">Macros</FieldLegend>
                <FieldDescription className="text-xs">
                  Add your meal macros (Protein, Fat and Carbs)
                </FieldDescription>
                <FieldGroup className="gap-y-4">
                  {field.state.value.map((_, index) => (
                    <div key={index} className="space-y-1.5">
                      <Label
                        htmlFor={`macros[${index}].grams`}
                        className="text-xs leading-none"
                        style={{ color: MACRO_CONFIG[field.state.value[index].nutrient].color }}
                      >
                        {MACRO_CONFIG[field.state.value[index].nutrient].label}
                      </Label>
                      <div className="flex items-center gap-1">
                        <form.Field
                          name={`macros[${index}].nutrient`}
                        >
                          {(subField) => {
                            const isSubFieldInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid;
                            const config = MACRO_CONFIG[subField.state.value];
                            return (
                              <Field orientation="horizontal" data-invalid={isSubFieldInvalid} className="flex-0">
                                <FieldContent>
                                  <Label
                                    htmlFor={`macros[${index}].grams`}
                                  >
                                    <div className="flex gap-1.5 items-center">
                                      <div className="rounded-full size-2" style={{ backgroundColor: config.color }} />
                                      <config.icon className="size-3.5" style={{ color: config.textColor }} />
                                    </div>
                                  </Label>
                                  {isSubFieldInvalid && (
                                    <FieldError errors={subField.state.meta.errors} />
                                  )}
                                </FieldContent>
                              </Field>
                            )
                          }}
                        </form.Field>
                        <form.Field
                          name={`macros[${index}].grams`}
                        >
                          {(subField) => {
                            const isSubFieldInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid;
                            return (
                              <Field orientation="horizontal" className="flex-1" data-invalid={isSubFieldInvalid}>
                                <FieldContent>
                                  <Input
                                    id={subField.name}
                                    name={subField.name}
                                    placeholder="30"
                                    className="placeholder:text-xs placeholder:text-foreground/40 h-7 text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                                    value={isNaN(subField.state.value) ? 0 : subField.state.value}
                                    type="number"
                                    onBlur={subField.handleBlur}
                                    onChange={(e) =>
                                      subField.handleChange(isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)
                                    }
                                    step={1}
                                    aria-invalid={isInvalid}
                                  />
                                  {isSubFieldInvalid && (
                                    <FieldError errors={subField.state.meta.errors} />
                                  )}
                                </FieldContent>
                              </Field>
                            )
                          }}
                        </form.Field>
                        <Button
                          className="ml-1.5 relative bottom-px text-foreground/80 hover:text-foreground"
                          variant="pure"
                          type="button"
                          size="none"
                          onClick={() => field.removeValue(index)}
                        >
                          <TrashIcon className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="space-y-2 flex flex-col">
                    {!hasProteinMacro && (
                      <Button
                        variant="pure"
                        type="button"
                        className="h-7 bg-emerald-500/30 border-emerald-500 rounded-sm"
                        onClick={() => field.pushValue({ nutrient: "PROTEIN", grams: 0 })}
                      >
                        <PlusIcon className="size-4" />
                        Add Protein
                      </Button>
                    )}

                    {!hasFatMacro && (
                      <Button
                        variant="pure"
                        type="button"
                        className="h-7 bg-amber-500/30 border-amber-500 rounded-sm"
                        onClick={() => field.pushValue({ nutrient: "FAT", grams: 0 })}
                      >
                        <PlusIcon className="size-4" />
                        Add Fat
                      </Button>
                    )}

                    {!hasCarbMacro && (
                      <Button
                        variant="pure"
                        type="button"
                        className="h-7 bg-sky-500/30 border-sky-500 rounded-sm"
                        onClick={() => field.pushValue({ nutrient: "CARBOHYDRATE", grams: 0 })}
                      >
                        <PlusIcon className="size-4" />
                        Add Carbs
                      </Button>
                    )}
                  </div>
                </FieldGroup>
              </FieldSet>
            )
          }}
        </form.Field>
        <Separator className="my-2" />
        <form.Subscribe
          selector={(state) => [state.isPristine]}
        >
          {([isPristine]) => (
            <Field orientation="horizontal" className="w-full grid md:grid-cols-2 gap-2">
              <Button disabled={isPristine} type="submit" variant="cool" form="meal-form">
                Submit
              </Button>
              <Button disabled={isPristine} type="button" variant="secondary" onClick={() => form.reset()}>
                Reset
              </Button>
            </Field>
          )}
        </form.Subscribe>

        <Button className="mt-2" type="button" variant="secondary" onClick={handleOpen}>
          Cancel
        </Button>

      </FieldGroup>
    </form>
  )
}

export default MealForm;
