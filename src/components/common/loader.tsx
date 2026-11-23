import { FC } from "react";

type Props = {
  label: string;
  isInnerMenuOpen: boolean;
};

// Fades in only after 300ms: cached, prefetched routes usually arrive first,
// so a fast navigation never flashes the loading text.
const Loader: FC<Props> = ({ label, isInnerMenuOpen }) => {
  return (
    <div className="animate-in fade-in ease-smooth fill-mode-both flex h-screen w-full items-center justify-center delay-300 duration-250">
      <span
        className={`animate-text-gradient via-surface inline-flex bg-linear-to-r from-muted to-muted bg-[200%_auto] bg-clip-text text-center text-3xl font-bold text-transparent ${
          isInnerMenuOpen ? "md:pl-72" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default Loader;
