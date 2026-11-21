/**
 * The cache tag on every CMS read behind a public page.
 *
 * One tag for all content: blocks populate experiences, social links and
 * media into pages and posts, and every post page lists its whole section
 * in the inner menu. Finer tags would rebuild nearly the same pages while
 * adding a way to forget one and leave a page stale. Revalidation is lazy,
 * so invalidating the site only re-renders the pages visitors open.
 */
export const CMS_CACHE_TAG = "cms";
