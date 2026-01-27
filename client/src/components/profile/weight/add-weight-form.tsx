'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddWeight } from "@/service/weight/mutations/use-add-weight";
import { cn } from "@/utils/common-utils";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const schema = z.object({
  kg: z.number("Must be a valid number").positive("Must be a positive number"),
})

const AddWeightForm = ({ setOpen, className }: Props) => {
  const [kg, setKg] = useState<number | undefined>(undefined);
  const [inputError, setInputError] = useState("");
  const mutation = useAddWeight();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const res = schema.safeParse({ kg });
    if (!res.success) {
      return setInputError(z.treeifyError(res.error).properties!.kg!.errors[0]);
    }
    mutation.mutate(res.data, {
      onSuccess: () => {
        toast.success("Weight added successfully!");
        setOpen(false);
      },
      onError: () => toast.error("Failed to add weight.")
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
          placeholder="https://github.com/miralhas.png"
          className="placeholder:text-xs placeholder:text-foreground/40"
          value={isNaN(kg!) ? 0 : kg}
          type="number"
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
