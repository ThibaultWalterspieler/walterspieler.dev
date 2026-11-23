import { FC } from "react";

import PageTransition from "@/components/common/page-transition";

type Props = {
  label: string;
};

const EmptyLayout: FC<Props> = (props) => {
  const { label } = props;

  return (
    <PageTransition>
      <div className="hidden h-full w-full items-center justify-center lg:flex">
        {/* Still: only loading indicators loop (Smooth, GLOSSARY.md). */}
        <span className="text-muted inline-flex pl-72 text-center text-3xl font-bold">
          {label}
        </span>
      </div>
    </PageTransition>
  );
};

export default EmptyLayout;
