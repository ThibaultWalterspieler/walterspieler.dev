import { FC } from "react";

import Image from "next/image";
import { TypedLocale } from "payload";

import Content from "@/components/Common/Content";
import { H1, P } from "@/components/Common/Typography";
import MotionArticle from "@/components/Motion/MotionArticle";
import { Separator } from "@/components/ui/separator";
import { formatDateToDayMonthYear } from "@/lib/date";
import { BlogPost, ExperiencePost } from "@payload-types";

type CommonProps = {
  lang: TypedLocale;
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

const variants = {
  initial: { opacity: 0, y: 25, filter: "blur-[15px]" },
  animate: { opacity: 1, y: 0, filter: "blur-none" },
  exit: { opacity: 0, y: -50 },
};

const Article: FC<Props> = (props) => {
  const { content, lang } = props;

  if (typeof content === "number") return null;

  return (
    <MotionArticle
      animate="animate"
      initial="initial"
      transition={{ duration: 0.7 }}
      variants={variants}
    >
      <div className="mb-8 flex flex-col">
        <H1 className="mb-5">{content.title}</H1>
        <time
          className="mb-5 text-sm text-stone-400"
          dateTime={content.createdAt}
        >
          {formatDateToDayMonthYear(content.createdAt, lang)}
        </time>
        <Separator />
        <span className="mt-5 mb-5 text-stone-400">
          <P>{content.description}</P>
        </span>
        {content.mainImage &&
          typeof content.mainImage !== "number" &&
          content.mainImage.url && (
            <Image
              alt={content.mainImage.alt || "Main article image"}
              className="rounded-lg object-cover lg:max-h-[550px] lg:max-w-full"
              height={content.mainImage.height || 0}
              priority={true}
              sizes="(min-width: 1280px) calc(100vw - 657px), (min-width: 1024px) calc(100vw - 609px), calc(100vw - 48px)"
              src={content.mainImage.url}
              width={content.mainImage.width || 0}
            />
          )}
      </div>
      <Content content={content.content} lang={lang} />
    </MotionArticle>
  );
};

export default Article;
