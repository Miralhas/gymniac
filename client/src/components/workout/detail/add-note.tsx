import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateWorkoutNote } from "@/service/workout/mutations/use-update-workout-note";
import { Workout } from "@/types/workout";
import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren, useState } from "react";
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
      <NoteWrapper className="w-full text-base border border-zind-50/15 p-4  text-foreground/80 rounded-xl border-l-primary border-l-3 italic cursor-pointer justify-start" onClick={onShowInput}>
        <p>{note}</p>
      </NoteWrapper>
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
          <NoteWrapper className="w-full text-base border border-zind-50/15 p-4 text-foreground/60 rounded-xl border-l-primary border-l-3 italic cursor-pointer justify-start" onClick={onShowInput}>
            <p>Add Note</p>
          </NoteWrapper>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

const NoteWrapper = ({ children, ...props }: PropsWithChildren<React.ComponentProps<"div">>) => {
  return (
    <div className="focus-visible:border-ring focus-visible:ring-ring/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none cursor-pointer aria-invalid:ring-red-700/20 dark:aria-invalid:ring-red-700/40 aria-invalid:border-red-700 dark:aria-invalid:border-red-700/50 aria-invalid:ring-[3px]" {...props}>
      {children}
    </div>
  )
}

export default AddNote;
