import { FC } from "react";

import ScriptCopyBtn from "@/components/ui/script-copy-btn";

const ScriptCopyBtnPage: FC = async () => {
  const customCommandMap = {
    npm: "npm run shadcn add button",
    yarn: "yarn shadcn add button",
    pnpm: "pnpm dlx shadcn@latest add button",
    bun: "bun x shadcn@latest add button",
  };

  return (
    <>
      <ScriptCopyBtn
        codeLanguage="shell"
        commandMap={customCommandMap}
        darkTheme="vitesse-dark"
        showMultiplePackageOptions={true}
      />
    </>
  );
};

export default ScriptCopyBtnPage;
