import { cacheLife } from "next/cache";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLines,
  CodeBlockTitle,
} from "@/components/ui/code-block";
import CodeBlockCopyButton from "@/components/ui/code-block-copy-button";
import { highlightCode } from "@/lib/highlighter";

type Props = {
  code: string;
  language: string;
  title?: string | null;
  lineNumbers?: boolean | null;
};

/** The Code block: highlighted on the server, so Shiki stays out of the browser bundle. */
export default async function CodeBlockSection({
  code,
  language,
  title,
  lineNumbers,
}: Props) {
  // Shiki reads Date.now(), which Cache Components refuses while prerendering
  // outside a cache scope. The output depends only on the props: keep it for good.
  "use cache";
  cacheLife("max");

  const lines = await highlightCode(code, language);
  const copyButton = <CodeBlockCopyButton value={code} />;

  return (
    <CodeBlock className="my-6">
      {title ? (
        <CodeBlockHeader>
          <CodeBlockTitle>{title}</CodeBlockTitle>
          <CodeBlockActions>{copyButton}</CodeBlockActions>
        </CodeBlockHeader>
      ) : (
        <CodeBlockActions>{copyButton}</CodeBlockActions>
      )}
      <CodeBlockContent lineNumbers={Boolean(lineNumbers)}>
        <CodeBlockLines code={code} lines={lines} />
      </CodeBlockContent>
    </CodeBlock>
  );
}
