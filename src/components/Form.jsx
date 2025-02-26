import { twMerge } from "tailwind-merge";

function Form({ children, className, action }) {
  return (
    <form
      action={action}
      className={twMerge(
        "bg-[#151515] p-4 rounded-lg flex flex-col gap-3 border-2 border-[#25232C]",
        className
      )}
    >
      {children}
    </form>
  );
}

export default Form;
