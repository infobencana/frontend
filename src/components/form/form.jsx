import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";
import { useContext } from "react";

const FormFieldContext = React.createContext({});
const FormItemContext = React.createContext({});

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);

  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = useContext(FormItemContext);

  return {
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormField = ({ name, children }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
};

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = "FormItem";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";

const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) return null;

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(
          "text-xs font-normal text-destructive lowercase",
          className,
        )}
        {...props}
      >
        {body}
      </p>
    );
  },
);

FormMessage.displayName = "FormMessage";

export { FormItem, FormControl, FormMessage, FormField };
