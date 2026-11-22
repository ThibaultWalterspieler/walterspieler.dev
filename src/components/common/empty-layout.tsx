import { FC } from "react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
};

const EmptyLayout: FC<Props> = (props) => {
  const { label } = props;

  return (
    <div
      className={cn(
        "animate-enter hidden h-full w-full items-center justify-center [animation-delay:0.3s] lg:flex",
      )}
    >
      <span
        className={cn(
          // bg-linear-to-r: tailwind-merge drops v3's bg-gradient-to-r next to bg-[200%_auto].
          "animate-text-gradient via-surface inline-flex bg-linear-to-r from-muted to-muted bg-[200%_auto] bg-clip-text pl-72 text-center text-3xl font-bold text-transparent",
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default EmptyLayout;
