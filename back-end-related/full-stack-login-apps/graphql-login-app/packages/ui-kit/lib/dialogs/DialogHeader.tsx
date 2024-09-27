import { FC, ReactNode } from "react";

interface DialogHeaderProps {
  icon?: ReactNode;
  headline?: string;
  text?: string;
}

const DialogHeader: FC<DialogHeaderProps> = ({ icon, headline, text }: DialogHeaderProps) => {
  return (
    <>
      <div className="uk-flex uk-items-center uk-justify-center uk-px-[24px] uk-dark:text-white">{icon}</div>
      <div className="uk-flex uk-items-center uk-justify-center uk-px-[24px] uk-text-headline-small uk-dark:text-white">
        {headline}
      </div>
      <p className="uk-flex uk-items-center uk-justify-center uk-px-[24px] uk-text-body-medium uk-text-gray-500">
        {text}
      </p>
    </>
  );
};

export { DialogHeader };
