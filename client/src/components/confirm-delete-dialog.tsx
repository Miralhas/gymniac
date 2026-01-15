import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
  title?: string;
  description?: string;
}

const ConfirmDeleteDialog = ({ onSubmit, open, setOpen, title = "Are you absolutely sure?", description }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary" asChild>
            <Button variant="secondary">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction variant="cool" onClick={onSubmit} asChild>
            <Button variant="cool">
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDeleteDialog;