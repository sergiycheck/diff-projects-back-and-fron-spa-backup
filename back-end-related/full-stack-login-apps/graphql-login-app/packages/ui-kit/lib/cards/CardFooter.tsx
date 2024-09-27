import { FC, ReactNode } from "react";

interface CardFooterProps {
  children?: ReactNode;
  className?: string;
}

const CardFooter: FC<CardFooterProps> = ({ children, className }: CardFooterProps) => {
  return <div className={`uk-flex uk-h-fit uk-w-full uk-flex-row uk-gap-[12px] ${className || ""}`}>{children}</div>;
};

export { CardFooter };
