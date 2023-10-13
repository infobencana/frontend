import * as React from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { Label } from "./label";
import { useFormContext } from "react-hook-form";

const Input = React.forwardRef(
  ({ className, type, name, label, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const form = useFormContext();

    const border =
      form && form.getFieldState(name, form.formState).error
        ? "border-red-500"
        : "border-snow focus-visible:border-green";

    return (
      <div className="w-full relative space-y-2">
        {label ? (
          <Label htmlFor={name} className="text-sm text-black capitalize">
            {label}
          </Label>
        ) : (
          false
        )}
        <div className="relative">
          <input
            type={type === "password" && visible ? "text" : type}
            name={name}
            id={name}
            className={cn(
              "flex h-12 w-full bg-white text-sm transition-all duration-200",
              "placeholder:text-gray disabled:cursor-not-allowed disabled:opacity-50",
              "rounded-[15px] border outline-0 ring-0",
              type === "password" ? "py-4 pl-4 pr-14" : "p-4",
              border,
              className,
            )}
            ref={ref}
            {...props}
          />
          {type === "password" ? (
            <span
              onClick={() => setVisible(!visible)}
              className="absolute right-5 -translate-y-1/2 top-1/2 cursor-pointer"
            >
              {visible ? (
                <IconEye size={22} color="#ACACAC" />
              ) : (
                <IconEyeClosed size={22} color="#ACACAC" />
              )}
            </span>
          ) : (
            false
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
