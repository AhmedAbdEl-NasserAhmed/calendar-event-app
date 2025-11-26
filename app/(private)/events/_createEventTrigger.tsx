import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CreateEventForm } from "./_createEventForm";
import { cn } from "@/lib/utils";

const CreateEventTrigger = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "default" }),
          "bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
        )}
      >
        Create New Event
      </DialogTrigger>
      <DialogContent className="max-h-[700px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Event</DialogTitle>
        </DialogHeader>
        <CreateEventForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventTrigger;
