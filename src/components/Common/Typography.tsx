import { cn } from "@/lib/utils";

const H1 = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & {
    ref: React.RefObject<HTMLHeadingElement>;
  }
) => (<h1
  className={cn(
    `text-spotlight scroll-m-20 text-4xl font-extrabold tracking-tight text-stone-50 lg:text-5xl`,
    className,
  )}
  ref={ref}
  {...props}
/>);
H1.displayName = "H1";

const H2 = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & {
    ref: React.RefObject<HTMLHeadingElement>;
  }
) => (<h2
  className={cn(
    `scroll-m-20 border-b border-grey pb-2 text-3xl font-semibold tracking-tight text-stone-50 first:mt-0 not-first:mt-6`,
    className,
  )}
  ref={ref}
  {...props}
/>);
H2.displayName = "H2";

const H3 = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & {
    ref: React.RefObject<HTMLHeadingElement>;
  }
) => (<h3
  className={cn(
    `scroll-m-20 text-2xl font-semibold tracking-tight text-stone-50`,
    className,
  )}
  ref={ref}
  {...props}
/>);
H3.displayName = "H3";

const H4 = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & {
    ref: React.RefObject<HTMLHeadingElement>;
  }
) => (<h4
  className={cn(
    `scroll-m-20 text-xl font-semibold tracking-tight text-stone-50`,
    className,
  )}
  ref={ref}
  {...props}
/>);
H4.displayName = "H4";

const P = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLParagraphElement> & {
    ref: React.RefObject<HTMLParagraphElement>;
  }
) => (<p
  className={cn(
    `leading-7 text-stone-300 not-first:mt-6`,
    className,
  )}
  ref={ref}
  {...props}
/>);
P.displayName = "P";

const LI = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLLIElement> & {
    ref: React.RefObject<HTMLLIElement>;
  }
) => (<li className={`${className}`} ref={ref} {...props} />);
LI.displayName = "LI";

const UL = (
  {
    ref,
    className,
    ...props
  }: React.HTMLAttributes<HTMLUListElement> & {
    ref: React.RefObject<HTMLUListElement>;
  }
) => (<ul
  className={cn(`my-6 ml-6 list-disc [&>li]:mt-2`, className)}
  ref={ref}
  {...props}
/>);
UL.displayName = "UL";

const A = (
  {
    ref,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    ref: React.RefObject<HTMLAnchorElement>;
  }
) => (<a
  className={cn(
    `text-base text-pearl-light decoration-pearl-dark hover:text-pearl-dark hover:underline`,
    className,
  )}
  ref={ref}
  {...props}
/>);
A.displayName = "A";

export { A, H1, H2, H3, H4, LI, P, UL };
