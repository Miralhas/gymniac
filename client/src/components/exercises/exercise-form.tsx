import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ExerciseInput, exerciseSchema } from "@/lib/schemas/exercise-schema";
import { ApiError } from "@/service/api-error";
import { useAddExercise } from "@/service/exercise/mutations/use-add-exercise";
import { useGetMuscleGroups } from "@/service/muscle-group/query/use-get-muscle-groups";
import { EMPTY_FILTER } from "@/utils/constants";
import { useForm } from "@tanstack/react-form";
import { AlertCircle } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const defaultValues: ExerciseInput = {
  description: "",
  muscleGroup: EMPTY_FILTER,
  name: "",
  videoHowTo: ""
}

const ExerciseForm = () => {
  const muscleQuery = useGetMuscleGroups();
  const mutation = useAddExercise();
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);
  // const detailRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: exerciseSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value, {
        onSuccess: () => {
          toast.success("Exercises added successfully!")
          form.reset();
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
      id="exercise-form"
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
      <FieldGroup className="gap-y-4">
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
                  placeholder="Preacher Curls"
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
          name="muscleGroup"
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-y-1.5">
                <FieldLabel htmlFor={field.name}>Muscle Group</FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value === EMPTY_FILTER ? "" : field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={isInvalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Muscle Group" />
                  </SelectTrigger>
                  <SelectContent className="h-[300px]" position="popper">
                    <SelectItem value={EMPTY_FILTER}>None</SelectItem>
                    {muscleQuery.data?.map(m => (
                      <SelectItem key={m.id} value={m.slug}>{m.name}</SelectItem>

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
          name="videoHowTo"
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-y-1.5">
                <FieldLabel className="inline-flex gap-1 items-center" htmlFor={field.name}>Video <span className="text-muted-foreground text-xs mt-0.5">(Showing how the exercise is done)</span></FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="https://www.youtube.com/watch?v=7RWbq-lbBlk"
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
          name="description"
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="gap-y-1.5">
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Unilateral, using dumbbells"
                  className="min-h-[80px] placeholder:text-sm"
                />
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
              <Button disabled={isPristine} type="submit" variant="cool" form="exercise-form">
                Submit
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

export default ExerciseForm;
