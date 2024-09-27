import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <button
      className="text-white bg-gray-800 hover:bg-gray-900 
      focus:outline-none focus:ring-4 focus:ring-gray-300
      font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 
    dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg 
      bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
      dark:focus:border-blue-500"
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
