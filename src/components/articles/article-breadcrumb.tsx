import { FC } from "react";

import PageLink from "@/components/common/page-link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getDictionary } from "@/lib/i18n/utils";

type Props = {
  title: string;
  collection: "experiences" | "blog";
};

const ArticleBreadcrumb: FC<Props> = async (props) => {
  const { title, collection } = props;

  const dictionary = await getDictionary();

  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <PageLink href="/">{dictionary.firstLevelPages.home}</PageLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            {collection === "blog" ? (
              <PageLink href="/blog">
                {dictionary.firstLevelPages.blog}
              </PageLink>
            ) : (
              <PageLink href="/experiences">
                {dictionary.firstLevelPages.experiences}
              </PageLink>
            )}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ArticleBreadcrumb;
