import { FC } from "react";

import Loader from "@/components/Common/Loader";

const Loading: FC = async () => {
  return <Loader isInnerMenuOpen={true} label="Loading experiences..." />;
};

export default Loading;
