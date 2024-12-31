import { FC } from "react";

import Loader from "@/components/Common/Loader";

const Loading: FC = async () => {
  return <Loader isInnerMenuOpen={false} label="Loading experiences..." />;
};

export default Loading;