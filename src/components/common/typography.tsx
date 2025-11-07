import { cn } from "@/lib/utils";

const H1: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & {
    ref?: React.Ref<HTMLHeadingElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <h1
      className={cn(
        `text-spotlight scroll-m-20 text-4xl font-extrabold tracking-tight text-stone-50 lg:text-5xl`,
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
H1.displayName = "H1";

const H2: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & {
    ref?: React.Ref<HTMLHeadingElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <h2
      className={cn(
        `border-grey scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-stone-50 not-first:mt-6 first:mt-0`,
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
H2.displayName = "H2";

const H3: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & {
    ref?: React.Ref<HTMLHeadingElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <h3
      className={cn(
        `scroll-m-20 text-2xl font-semibold tracking-tight text-stone-50`,
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
H3.displayName = "H3";

const H4: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & {
    ref?: React.Ref<HTMLHeadingElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <h4
      className={cn(
        `scroll-m-20 text-xl font-semibold tracking-tight text-stone-50`,
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
H4.displayName = "H4";

const P: React.FC<
  React.HTMLAttributes<HTMLParagraphElement> & {
    ref?: React.Ref<HTMLParagraphElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <p
      className={cn(`leading-7 text-stone-300 not-first:mt-6`, className)}
      ref={ref}
      {...rest}
    />
  );
};
P.displayName = "P";

const LI: React.FC<
  React.HTMLAttributes<HTMLLIElement> & { ref?: React.Ref<HTMLLIElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return <li className={`${className}`} ref={ref} {...rest} />;
};
LI.displayName = "LI";

const UL: React.FC<
  React.HTMLAttributes<HTMLUListElement> & { ref?: React.Ref<HTMLUListElement> }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <ul
      className={cn(`my-6 ml-6 list-disc [&>li]:mt-2`, className)}
      ref={ref}
      {...rest}
    />
  );
};
UL.displayName = "UL";

const A: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    ref?: React.Ref<HTMLAnchorElement>;
  }
> = (props) => {
  const { className, ref, ...rest } = props;
  return (
    <a
      className={cn(
        `text-pearl-light decoration-pearl-dark hover:text-pearl-dark text-base hover:underline`,
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
};
A.displayName = "A";

export { A, H1, H2, H3, H4, LI, P, UL };
