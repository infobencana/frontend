import { useRef } from "react";
import useAutosizeTextArea from "@/hooks/use-auto-size-text-area";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";

export const TextArea = forwardRef(({ className, value, ...props }, ref) => {
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <div>
      <textarea
        ref={textAreaRef}
        rows={1}
        value={value}
        spellCheck="false"
        className={cn(
          "no-scrollbar w-full h-auto bg-transparent text-black font-inter resize-none placeholder:text-gray/40",
          className,
        )}
        {...props}
      />
    </div>
  );
});

TextArea.displayName = "textArea";
