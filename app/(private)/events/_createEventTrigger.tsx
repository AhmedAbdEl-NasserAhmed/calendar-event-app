import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { CreateEventForm } from "./_createEventForm";

const CreateEventTrigger = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="cursor-pointer">Create New Event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>New Event</DialogHeader>
          <CreateEventForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateEventTrigger;
