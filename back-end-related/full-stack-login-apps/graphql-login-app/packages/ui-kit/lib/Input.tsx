import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      className="uk-block uk-w-full uk-p-2 uk-text-gray-900 uk-border uk-border-gray-300 uk-rounded-lg 
      uk-bg-gray-50 uk-sm:text-xs uk-focus:ring-blue-500 uk-focus:border-blue-500 uk-dark:bg-gray-700 
      uk-dark:border-gray-600 uk-dark:placeholder-gray-400 uk-dark:text-white uk-dark:focus:ring-blue-500 
      uk-dark:focus:border-blue-500"
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
