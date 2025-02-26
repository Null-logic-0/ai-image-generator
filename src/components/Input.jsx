import { twMerge } from "tailwind-merge";

function Input({ isTextarea, className, ...props }) {
  const Component = isTextarea ? "textarea" : "input";
  return (
    <Component
      {...props}
      className={twMerge(
        "bg-[#060610] p-2 border-2 border-[#25232C] text-white rounded-lg focus:border-[#CAFF00] focus:outline-none",
        className
      )}
    />
  );
}

export default Input;
