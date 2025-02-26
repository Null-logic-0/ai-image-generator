import { twMerge } from "tailwind-merge";

function Input({ isTextarea, className, ...props }) {
  const Component = isTextarea ? "textarea" : "input";
  return (
    <Component
      {...props}
      className={twMerge("bg-stone-600 p-2  text-white rounded-lg ", className)}
    />
  );
}

export default Input;
