import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button
      className="uk-text-white uk-bg-gray-800 uk-hover:bg-gray-900 
      uk-focus:outline-none uk-focus:ring-4 uk-focus:ring-gray-300
      uk-font-medium uk-rounded-lg uk-text-lg uk-px-5 uk-py-2.5 uk-mr-2 uk-mb-2 
      uk-dark:bg-gray-800 uk-dark:hover:bg-gray-700 uk-dark:focus:ring-gray-700 uk-dark:border-gray-700"
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
