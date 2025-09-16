import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
}>;

const ScrollArea: FC<Props> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <div className={cn("scrollable-area relative w-full", className)} {...rest}>
      {children}
    </div>
  );
};

export default ScrollArea;
