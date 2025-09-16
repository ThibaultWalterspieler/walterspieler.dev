import { FC } from "react";

import Loader from "@/components/common/loader";

const Loading: FC = async () => {
  return <Loader isInnerMenuOpen={false} label="Loading legal notice..." />;
};

export default Loading;
