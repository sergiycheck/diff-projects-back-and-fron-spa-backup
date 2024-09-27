import { FC, ReactNode } from "react";

interface DialogFooterProps {
  children?: ReactNode;
  className?: string;
}

const DialogFooter: FC<DialogFooterProps> = ({ children, className }: DialogFooterProps) => {
  return (
    <div
      className={`uk-mb-[24px] uk-mt-[8px] uk-flex uk-items-center uk-justify-end uk-gap-[8px] uk-px-[24px] ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export { DialogFooter };
