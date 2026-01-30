import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateWorkoutNote } from "@/service/workout/mutations/use-update-workout-note";
import { Workout } from "@/types/workout";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  note?: string;
  id: Workout["id"]
}

const AddNote = ({ note, id }: Props) => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNoteText, setNewNoteText] = useState(note ?? "");
  const updateMutation = useUpdateWorkoutNote(id);

  const hasNote = !!note && !showNoteInput;

  const onShowInput = () => setShowNoteInput(prev => !prev);

  if (hasNote) {
    return (
      <Button variant="pure" size="none" className="w-full text-base border border-zind-50/15 p-4  text-foreground/80 rounded-xl border-l-primary border-l-3 italic cursor-pointer justify-start" onClick={onShowInput}>
        <p>{note}</p>
      </Button>
    )
  }

  const handleSubmit = () => {
    updateMutation.mutate(newNoteText, {
      onSuccess: () => {
        toast.success("Note submitted successfully!")
        onShowInput();
      },
      onError: () => toast.error("Failed to submit note! Try again later.")
    })
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          height: { duration: 0.1, ease: "easeInOut" },
          opacity: { duration: 0.1, ease: "easeInOut" },
        }}
        key={showNoteInput ? "editor" : "button"}
      >
        {showNoteInput ? (
          <form className="space-y-2 my-8" onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}>
            <Textarea autoFocus placeholder="Note..." value={newNoteText} onChange={(e) => setNewNoteText(e.currentTarget.value)} />
            <div className="flex gap-2 justify-end items-center">
              <Button type="button" onClick={onShowInput} variant="secondary" size="sm">Cancel</Button>
              <Button type="submit" variant="cool" size="sm" disabled={!newNoteText}>Submit</Button>
            </div>
          </form>
        ) : (
          <Button variant="pure" size="none" className="w-full text-base border border-zind-50/15 p-4 text-foreground/80 rounded-xl border-l-primary border-l-3 italic cursor-pointer justify-start" onClick={onShowInput}>
            <p>Add Note</p>
          </Button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default AddNote;
