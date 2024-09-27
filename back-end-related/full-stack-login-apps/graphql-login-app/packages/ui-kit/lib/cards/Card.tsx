import { FC, ReactNode } from "react";

import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";
import { CardHeader } from "./CardHeader";

interface CardProps {
  bg?: string;
  children?: ReactNode;
  className?: string;
  padding?: string;
  width?: string;
}

interface CardComponent extends FC<CardProps> {
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Header: typeof CardHeader;
}

const Card: CardComponent = ({ children, className, bg, padding, width }: CardProps) => {
  return (
    <div
      className={`uk-flex uk-h-fit uk-flex-col uk-gap-[8px] uk-rounded-large uk-dark:text-white 
      ${width || "uk-w-full"}   
      ${padding || "uk-p-[12px]"}
      ${bg || "uk-bg-indigo-100 uk-dark:bg-indigo-500/5"} 
      ${className || ""}`}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
