import { FC } from "react";

import { getLastUpdateDate } from "@/components/articles/last-update-date";
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

  const lastUpdateDate =
    props.collection === "blog"
      ? getLastUpdateDate(props.content.content)
      : undefined;

  return (
    <article>
      <div className="mb-8 flex flex-col">
        <H1 className="mb-5">{content.title}</H1>
        <p className="text-muted mb-5 text-sm">
          <time dateTime={content.createdAt}>
            {formatDateToDayMonthYear(content.createdAt)}
          </time>
          {lastUpdateDate && (
            <>
              {" · Updated "}
              <time dateTime={lastUpdateDate}>
                {formatDateToDayMonthYear(lastUpdateDate)}
              </time>
            </>
          )}
        </p>
        <Separator />
        <span className="text-muted mt-5 mb-5">
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
