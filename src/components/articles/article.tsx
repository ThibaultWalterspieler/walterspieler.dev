import { FC } from "react";

import Content from "@/components/common/content";
import MediaImage from "@/components/common/media-image";
import { H1, P } from "@/components/common/typography";
import { Separator } from "@/components/ui/separator";
import { formatDateToDayMonthYear } from "@/lib/date";
import { BlogPost, ExperiencePost } from "@payload-types";

type CommonProps = {
  slug: string;
};

type WorkProps = {
  collection: "experiences";
  content: ExperiencePost;
};

type BlogProps = {
  collection: "blog";
  content: BlogPost;
};

type Props = (WorkProps | BlogProps) & CommonProps;

const Article: FC<Props> = (props) => {
  const { content } = props;

  if (typeof content === "number") return null;

  return (
    <article>
      <div className="mb-8 flex flex-col">
        <H1 className="mb-5">{content.title}</H1>
        <time
          className="mb-5 text-sm text-muted"
          dateTime={content.createdAt}
        >
          {formatDateToDayMonthYear(content.createdAt)}
        </time>
        <Separator />
        <span className="mt-5 mb-5 text-muted">
          <P>{content.description}</P>
        </span>
        {content.mainImage && typeof content.mainImage !== "number" && (
          <MediaImage
            className="rounded-lg object-cover lg:max-h-[550px] lg:max-w-full"
            media={content.mainImage}
            preload={true}
          />
        )}
      </div>
      <Content content={content.content} />
    </article>
  );
};

export default Article;
