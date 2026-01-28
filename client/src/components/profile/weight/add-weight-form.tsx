'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddWeight } from "@/service/weight/mutations/use-add-weight";
import { useUpdateWeightById } from "@/service/weight/mutations/use-update-weight-by-id";
import { Weight } from "@/types/weight";
import { cn } from "@/utils/common-utils";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

type PostProps = {
  mode: "POST";
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

type PutProps = {
  mode: "PUT",
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  weight: Weight;
}

type Props =
  | PostProps
  | PutProps;

const schema = z.object({
  kg: z.number("Must be a valid number").positive("Must be a positive number"),
})

type Data = z.infer<typeof schema>;

const AddWeightForm = (props: Props) => {
  const { mode, setOpen, className } = props;
  const isPost = mode === "POST";
  const [kg, setKg] = useState<number | undefined>(!isPost ? props.weight.kg : undefined);
  const [inputError, setInputError] = useState("");
  const postMutation = useAddWeight();
  const updateMutation = useUpdateWeightById();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const res = schema.safeParse({ kg });
    if (!res.success) {
      return setInputError(z.treeifyError(res.error).properties!.kg!.errors[0]);
    }

    switch (mode) {
      case "POST": handlePost(res.data); break;
      case "PUT": handlePut(res.data); break;
    }
  }

  const handlePost = (data: Data) => {
    if (!isPost) return;
    postMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Weight added successfully!");
        setOpen(false);
      },
      onError: () => toast.error("Failed to add weight.")
    });
  }

  const handlePut = (data: Data) => {
    if (isPost) return;
    updateMutation.mutate({ data, id: props.weight.id }, {
      onSuccess: () => {
        toast.success("Weight updated successfully!");
        setOpen(false);
      },
      onError: () => toast.error("Failed to update weight.")
    });
  }

  return (
    <form className={cn("space-y-3", className)} onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="kg" className="text-foreground/80 inline-flex gap-1">
          Your current Weight <span className="text-light font-light text-muted-foreground text-xs">(kg)</span>
        </Label>
        <Input
          id="kg"
          name="kg"
          placeholder="82.3"
          className="placeholder:text-xs placeholder:text-foreground/40"
          value={(kg === undefined || isNaN(kg)) ? "" : kg}
          type="number"
          step={0.1}
          aria-invalid={!!inputError}
          onChange={(e) => setKg(e.currentTarget.valueAsNumber)}
        />
        {inputError && (
          <p className="text-sm tracking-tight font-medium text-destructive">{inputError}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="cool" disabled={!kg}>Submit</Button>
        <Button variant="secondary" type="button" onClick={() => { setOpen(false); setInputError("") }}>Cancel</Button>
      </div>
    </form>
  )
}

export default AddWeightForm;
