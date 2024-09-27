import { FC, ReactNode, useEffect, useId } from "react";

import { DialogBody } from "./DialogBody";
import { DialogFooter } from "./DialogFooter";
import { DialogHeader } from "./DialogHeader";

interface DialogProps {
  body?: ReactNode;
  button?: ReactNode;
  children?: ReactNode;
  headline?: string;
  icon?: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  text?: string;
}

interface DialogComponent extends FC<DialogProps> {
  Header: typeof DialogHeader;
  Body: typeof DialogBody;
  Footer: typeof DialogFooter;
}

const Dialog: DialogComponent = ({ children, isVisible, onClose }: DialogProps) => {
  const scrim = useId();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: { id: string } }) => {
    e.target.id === scrim && onClose();
  };

  return (
    <div id={scrim} onClick={handleClose} className={`uk-fixed uk-inset-0 uk-z-20 uk-flex uk-bg-gray-800/50`}>
      <div className="uk-z-50 uk-flex  uk-flex-col uk-items-center uk-justify-center uk-overflow-hidden">
        <div
          className="uk-absolute uk-left-1/2 uk-top-1/2 uk-z-10 uk-flex w-11/12 uk-min-w-[280px] uk-max-w-[580px] uk--translate-y-1/2 uk--translate-x-1/2 uk-animate-fade-in 
        uk-flex-col uk-gap-[16px] uk-rounded-[28px] uk-bg-indigo-50 uk-pt-[24px] uk-dark:bg-gray-900"
        >
          {/*header*/}
          {children}
        </div>
      </div>
    </div>
  );
};

Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;

export { Dialog };
