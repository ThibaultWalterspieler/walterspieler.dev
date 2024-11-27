"use client";

import { FC } from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { TypedLocale } from "payload";

import { A, H1, P } from "@/components/Common/Typography";
import { Content } from "@/components/Content";
import { Separator } from "@/components/ui/separator";
import { BlogPost, ExperiencePost } from "@/payload-types";

type CommonProps = {
  lang: TypedLocale;
  slug: string;
};

type WorkProps = {
  collection: "work";
  content: ExperiencePost;
};

type BlogProps = {
  collection: "blog";
  content: BlogPost;
};

type Props = (WorkProps | BlogProps) & CommonProps;

const variants = {
  initial: { opacity: 0, y: 25, filter: "blur(15px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -50 },
};

const Article: FC<Props> = (props) => {
  const { collection, content, lang } = props;

  const externalLink = null;

  if (typeof content === "number") return null;

  return (
    <motion.article
      animate="animate"
      initial="initial"
      transition={{ duration: 0.7 }}
      variants={variants}
    >
      <div className="mb-8 flex flex-col">
        <H1 className="mb-5">{content.title}</H1>
        {externalLink && (
          <A className="mb-2" href={externalLink} rel={"noopener nofollow"}>
            LINK
          </A>
        )}
        <span className="mb-5 text-stone-400">
          <P>{content.description}</P>
        </span>
        {collection === "work" && <Separator />}
        {collection === "blog" && (
          <Image
            alt={""}
            className="rounded-t-lg object-cover lg:max-h-[550px] lg:max-w-full"
            height={0}
            priority={true}
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 688px, 768px"
            src={""}
            width={0}
          />
        )}
      </div>
      <Content content={content.content} lang={lang} />
    </motion.article>
  );
};

export default Article;
