import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import ButtonWithIcon from "./ui/buttonWithIcon";
import { BasicIcons } from "@/utils/BasicIcons";

const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonWithIcon onClick={() => {}}>
          {BasicIcons.settings}
        </ButtonWithIcon>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Settings</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
