import { FC, ReactNode } from "react";

interface DialogBodyProps {
  children?: ReactNode;
  className?: string;
}

const DialogBody: FC<DialogBodyProps> = ({ children, className }: DialogBodyProps) => {
  return <div className={`uk-flex uk-w-full uk-px-[24px] ${className || ""}`}>{children}</div>;
};

export { DialogBody };
