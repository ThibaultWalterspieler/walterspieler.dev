import { FC } from "react";

import Loader from "@/components/common/loader";

const Loading: FC = async () => {
  return <Loader isInnerMenuOpen={false} label="Loading 99Stud..." />;
};

export default Loading;
