import { FC, ReactNode } from "react";

interface CardBodyProps {
  children?: ReactNode;
  className?: string;
  height?: string;
}

const CardBody: FC<CardBodyProps> = ({ children, className, height }: CardBodyProps) => {
  return (
    <div
      className={`uk-flex uk-w-full uk-flex-col uk-gap-[12px]  
    ${height || "uk-h-fit"}
    ${className || ""}
    `}
    >
      {children}
    </div>
  );
};

export { CardBody };
