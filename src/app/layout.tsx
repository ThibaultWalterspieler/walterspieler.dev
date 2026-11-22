import "@/styles/globals.css";

import { FC, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return children;
};

export default RootLayout;
