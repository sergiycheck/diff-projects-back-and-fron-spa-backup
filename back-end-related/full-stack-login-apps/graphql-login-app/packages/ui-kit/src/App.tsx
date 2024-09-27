import { useState } from "react";
import { Dialog } from "../lib/dialogs/Dialog";
import { Button } from "../lib/Button";
import { Input } from "../lib/Input";

export function App() {
  const [showDialog, setShowDialog] = useState(false);

  function onClose() {
    setShowDialog(false);
  }

  return (
    <>
      <h1 className="uk-text-3xl uk-font-bold uk-underline">Shared ui kit</h1>

      <div className="uk-flex uk-flex-col uk-w-full uk-items-center uk-justify-center">
        <Button>simple button</Button>
        <Input placeholder="simple input" />

        <Button onClick={() => setShowDialog(true)}>Dialog</Button>

        <Dialog isVisible={showDialog} onClose={onClose}>
          <Dialog.Header
            headline="Reset Settings?"
            text="Use dialogs for prompts that block an app’s normal operation, and for critical information that requires a specific user task, decision, or acknowledgement."
          />
          <Dialog.Body className={"uk-flex uk-w-full uk-flex-col"}>
            <p className="uk-text-sm">dialog body</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={onClose}>Cancel</Button> <Button onClick={onClose}>Accept</Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    </>
  );
}
