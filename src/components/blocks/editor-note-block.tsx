import { FC } from "react";

import { formatDateToDayMonthYear } from "@/lib/date";
import SerializeLexical from "@/lib/payload/lexical/Serialize";
import { cn } from "@/lib/utils";
import { BlogPost } from "@payload-types";

type EditorNote = Extract<
  NonNullable<BlogPost["content"]>[number],
  { blockType: "EditorNote" }
>;

type Props = Pick<EditorNote, "kind" | "date" | "body">;

const LABELS: Record<EditorNote["kind"], string> = {
  update: "Update",
  correction: "Correction",
};

const EditorNoteBlock: FC<Props> = ({ kind, date, body }) => {
  return (
    <aside
      className={cn(
        "bg-surface my-6 rounded-r-md border-l-2 px-5 py-4",
        kind === "correction" ? "border-danger" : "border-accent",
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold tracking-wide uppercase",
          kind === "correction" ? "text-danger" : "text-accent",
        )}
      >
        {LABELS[kind]} ·{" "}
        <time dateTime={date}>{formatDateToDayMonthYear(date)}</time>
      </p>
      <div className="[&>p]:mt-2">
        <SerializeLexical nodes={body.root.children} />
      </div>
    </aside>
  );
};

export default EditorNoteBlock;
