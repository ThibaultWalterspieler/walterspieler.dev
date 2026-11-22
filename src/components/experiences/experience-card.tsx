"use client";

import { FC } from "react";

import { CalendarIcon } from "lucide-react";
import Link from "next/link";

import { A, H3 } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDateToMonthYear } from "@/lib/date";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  logo: string;
  link: string;
  duration: {
    start: Date | string | null;
    end?: Date | string | null;
    difference?: string | null;
  };
  relatedWorkPostSlug: string;
  buttonLabel: string;
  tags: {
    name: string;
  }[];
};

const ExperienceCard: FC<Props> = (props) => {
  const {
    title,
    description,
    // logo,
    duration,
    link,
    relatedWorkPostSlug,
    buttonLabel,
    tags,
  } = props;

  return (
    <div
      className="group bg-surface relative my-8 w-full overflow-hidden rounded-xl transition-transform focus-within:-translate-y-0.5 hover:-translate-y-0.5"
      // CSS variables, not React state: the glow follows the pointer without re-rendering.
      onPointerMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        e.currentTarget.style.setProperty("--glow-x", `${e.clientX - left}px`);
        e.currentTarget.style.setProperty("--glow-y", `${e.clientY - top}px`);
      }}
    >
      <div
        className={cn(
          "absolute right-5 bottom-0 left-0 h-px w-80 bg-linear-to-l from-transparent via-white/30 via-10% to-transparent",
        )}
      />
      <div className="pointer-events-none absolute -inset-px rounded-xl bg-[radial-gradient(200px_circle_at_var(--glow-x)_var(--glow-y),color-mix(in_srgb,var(--color-accent)_8%,transparent),transparent_80%)] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="border-border group-focus-within:border-muted/50 group-hover:border-muted/50 relative flex flex-col rounded-xl border transition-colors">
        <div className="flex flex-row items-center gap-4 space-y-2 p-6">
          {/* <PrismicNextImage
            className="max-h-8 w-8"
            field={logo}
            sizes="(max-width: 640px) 32px, (max-width: 768px) 32px, (max-width: 1024px) 32px, 32px"
          /> */}
          <div className="grid gap-1">
            <H3 className="text-xl">{title}</H3>
            <div className="text-muted flex items-center text-sm md:gap-1">
              {duration.start && (
                <>
                  <CalendarIcon className="text-muted mr-1 size-4" />
                  {!duration.end && <span>Since</span>}
                  <span>{formatDateToMonthYear(duration.start)}</span>
                  {duration.end && (
                    <>
                      <span> - </span>
                      <span>{formatDateToMonthYear(duration.end)}</span>
                      <Separator
                        className="mx-2 hidden h-4 md:block"
                        orientation="vertical"
                      />
                      <span className="hidden md:block">
                        {duration.difference}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
            {link && (
              <A
                aria-label={`${title} website`}
                // Above the card-wide link below, so it stays clickable.
                className="relative z-10 text-sm"
                href={link}
                rel={"noopener nofollow"}
              >
                {link.replace(/(^\w+:|^)\/\//, "")}
              </A>
            )}
          </div>
        </div>
        <div className="text-foreground p-6 pt-0 text-sm leading-[1.5]">
          <p>{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                className="relative inline-flex overflow-hidden rounded-full p-px"
                key={idx}
              >
                <span className="paused group-focus-within:running group-hover:running absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
                <span className="text-heading inline-flex h-full w-full items-center justify-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-3xl">
                  {tag.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-5 p-6 pt-0 md:flex-row">
          {relatedWorkPostSlug && (
            <div className="flex">
              <Button asChild variant="outline">
                <Link
                  aria-label={`Read more about ${title}`}
                  // Stretched over the whole card, which used to navigate with router.push.
                  className="after:absolute after:inset-0 after:content-['']"
                  href={`/experiences/${relatedWorkPostSlug}`}
                >
                  {buttonLabel} {title}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
