import { cache, FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

import Article from "@/components/Articles/Article";
import ArticleBreadcrumb from "@/components/Articles/ArticleBreadcrumb";
import ScrollArea from "@/components/Common/ScrollArea";
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
  const blogPosts = await payload.find({
    collection: "blogPosts",
    limit: 1000,
    select: {
      slug: true,
    },
  });

  return blogPosts.docs.map((blogPost) => ({
    slug: blogPost.slug,
  }));
}

const BlogPostPage: FC<Props> = async (props) => {
  const { params } = props;
  const { slug } = await params;

  const blogPost = await getBlogPost(slug);

  const jsonLd = getSchemaNewsArticle(
    blogPost.meta?.title || blogPost.title,
    blogPost.createdAt,
    blogPost.updatedAt,
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
            <ArticleBreadcrumb collection="blog" title={blogPost.title} />
            <Article collection="blog" content={blogPost} slug={slug} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

const getBlogPost = cache(async (slug: string) => {
  const payload = await getPayload({
    config,
  });

  const blogPosts = await payload.find({
    collection: "blogPosts",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!blogPosts.docs[0]) {
    notFound();
  }

  return blogPosts.docs[0];
});

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { slug } = await params;

  const page = await getBlogPost(slug);

  return getMetadata(page.meta);
}

export default BlogPostPage;
