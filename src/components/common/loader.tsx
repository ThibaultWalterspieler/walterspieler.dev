import { FC } from "react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  isInnerMenuOpen: boolean;
};

const Loader: FC<Props> = ({ label, isInnerMenuOpen }) => {
  return (
    <div className={cn("flex h-screen w-full items-center justify-center")}>
      <span
        className={`animate-text-gradient via-metal inline-flex bg-linear-to-r from-stone-400 to-stone-400 bg-[200%_auto] bg-clip-text text-center text-3xl font-bold text-transparent ${
          isInnerMenuOpen ? "md:pl-72" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default Loader;
