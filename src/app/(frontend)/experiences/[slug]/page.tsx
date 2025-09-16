import { cache, FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import Article from "@/components/articles/article";
import ArticleBreadcrumb from "@/components/articles/article-breadcrumb";
import ScrollArea from "@/components/common/scroll-area";
import getSchemaNewsArticle from "@/lib/schema-dts/news-article";
import getMetadata from "@/lib/seo/metadata";
import config from "@payload-config";

type Params = Promise<{
  slug: string;
}>;

type Props = {
  params: Params;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const experiencesPosts = await payload.find({
    collection: "experiencePosts",
    limit: 1000,
    select: {
      slug: true,
    },
  });

  return experiencesPosts.docs.map((experiencePost) => ({
    slug: experiencePost.slug,
  }));
}

const ExperiencePage: FC<Props> = async (props) => {
  const { params } = props;
  const { slug } = await params;

  const experiencesPost = await getExperiencePost(slug);

  const jsonLd = getSchemaNewsArticle(
    experiencesPost.meta?.title || experiencesPost.title,
    experiencesPost.createdAt,
    experiencesPost.updatedAt,
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ScrollArea className="z-0 flex flex-col lg:pl-72">
        <div className="content-wrapper mt-14 lg:mt-0">
          <div className="content">
            <ArticleBreadcrumb
              collection="experiences"
              title={experiencesPost.title}
            />
            <Article
              collection="experiences"
              content={experiencesPost}
              slug={slug}
            />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { slug } = await params;

  const page = await getExperiencePost(slug);

  return getMetadata(page.meta);
}

const getExperiencePost = cache(async (slug: string) => {
  const payload = await getPayload({
    config,
  });

  const experiencesPosts = await payload.find({
    collection: "experiencePosts",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!experiencesPosts.docs[0]) {
    notFound();
  }

  return experiencesPosts.docs[0];
});

export default ExperiencePage;
