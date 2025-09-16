import { FC } from "react";

import { Metadata } from "next";
import { getPayload } from "payload";

import EmptyLayout from "@/components/Common/EmptyLayout";
import MenuInitializer from "@/contexts/MenuContext/MenuInitializer";
import { getDictionary } from "@/lib/i18n/utils";
import getMetadata from "@/lib/seo/metadata";
import config from "@payload-config";

export const revalidate = 3600;

const Blog: FC = async () => {
  const dictionary = await getDictionary();

  return (
    <>
      <MenuInitializer isInnerMenuOpen />
      <EmptyLayout label={dictionary.selectABlogPost} />
    </>
  );
};

const getBlogPage = async () => {
  const payload = await getPayload({
    config,
  });

  const pages = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "blog",
      },
    },
  });

  return pages.docs[0];
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();

  return getMetadata(page.meta);
}

export default Blog;
