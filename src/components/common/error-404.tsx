import { FC } from "react";

import PageLink from "@/components/common/page-link";
import PageTransition from "@/components/common/page-transition";
import { Button } from "@/components/ui/button";

type Props = {
  label?: string;
  button: {
    label: string;
    path: string;
  };
};

const Error404: FC<Props> = (props) => {
  const { label, button } = props;

  return (
    <PageTransition>
      <div className="text-foreground flex h-full w-full flex-col items-center justify-center">
        <h2 className="text-9xl font-bold">404</h2>
        <p className="mt-5 text-2xl font-bold">
          {label || "You're lost in the void friend!"}
        </p>
        <Button asChild className="mt-5" variant="secondary">
          <PageLink href={button.path || "/"}>{button.label}</PageLink>
        </Button>
      </div>
    </PageTransition>
  );
};

export default Error404;
