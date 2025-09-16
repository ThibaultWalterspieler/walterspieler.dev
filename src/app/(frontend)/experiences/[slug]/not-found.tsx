import { FC } from "react";

import Error404 from "@/components/common/error-404";

const NotFoundPage: FC = () => {
  return (
    <Error404
      button={{
        label: "Return to experiences",
        path: "/experiences",
      }}
      label="This experience does not exist."
    />
  );
};

export default NotFoundPage;
