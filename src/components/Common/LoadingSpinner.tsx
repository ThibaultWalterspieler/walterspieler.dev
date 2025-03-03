import { FC } from "react";

import { cn } from "@/lib/utils";

const LoadingSpinner: FC = () => {
  return (
    <div className={cn("grid", "place-content-center", "h-screen w-full")}>
      <div
        aria-label="loading"
        className={cn(
          "inline-block",
          "size-4",
          "text-pearl",
          "animate-spin rounded-full border-[2px] border-current border-t-transparent",
        )}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
