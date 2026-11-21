import { FC } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Article from "@/components/articles/article";
import ArticleBreadcrumb from "@/components/articles/article-breadcrumb";
import ScrollArea from "@/components/common/scroll-area";
import { getPublishedPost, getPublishedPosts } from "@/lib/payload/queries";
import getSchemaNewsArticle from "@/lib/schema-dts/news-article";
import getMetadata from "@/lib/seo/metadata";

type Params = Promise<{
  slug: string;
}>;

type Props = {
  params: Params;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts("blogPosts");

  return posts.map((post) => ({ slug: post.slug }));
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

const getBlogPost = async (slug: string) => {
  const post = await getPublishedPost("blogPosts", slug);

  if (!post) {
    notFound();
  }

  return post;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { slug } = await params;

  const page = await getBlogPost(slug);

  return getMetadata(page.meta);
}

export default BlogPostPage;
