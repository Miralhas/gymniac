import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PDFViewer } from "@react-pdf/renderer";
import { FileDownIcon } from "lucide-react";
import WorkoutPlanPDF from ".";
import { WorkoutPlan } from "@/types/workout-plan";

const PdfModal = ({ workoutPlan }: { workoutPlan: WorkoutPlan }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="pure"
          size="none"
          className="w-full md:w-[160px] flex items-center justify-center text-xs text-[13px] rounded-md h-[48px] border border-accent/30 bg-accent/10 text-white ml-auto transition-all ease-in-out duration-200 hover:-translate-y-0.75 hover:translate-x-0.75 hover:text-accent order-0"
        >
          <FileDownIcon className="size-4 mr-2 text-accent" />
          Export to PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1024px]!" >
        <DialogHeader>
          <DialogTitle>Report PDF Viewer</DialogTitle>
          <DialogDescription className="sr-only">
            Visualize and download your report PDF
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <PDFViewer className="w-full h-full min-h-[60vh] p-6">
            <WorkoutPlanPDF workoutPlan={workoutPlan} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default PdfModal;


