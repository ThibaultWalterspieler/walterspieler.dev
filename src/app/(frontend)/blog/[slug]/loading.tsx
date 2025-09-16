import { FC } from "react";

import Loader from "@/components/common/loader";

const Loading: FC = async () => {
  return <Loader isInnerMenuOpen={true} label="Loading blog post..." />;
};

export default Loading;
