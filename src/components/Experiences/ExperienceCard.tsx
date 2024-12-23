"use client";

import { FC } from "react";

import { CalendarIcon } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { A, H3 } from "@/components/Common/Typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDateToMonthYear } from "@/lib/date";
import { Link, useRouter } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { languageTag } from "@/paraglide/runtime";

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

  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      className="bg-metal group relative my-8 w-full cursor-pointer overflow-hidden rounded-xl"
      onClick={() => {
        if (relatedWorkPostSlug) {
          router.push(`/experiences/${relatedWorkPostSlug}`);
        }
      }}
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
    >
      <div
        className={cn(
          "absolute right-5 bottom-0 left-0 h-px w-80 bg-linear-to-l from-transparent via-white/30 via-10% to-transparent",
        )}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
						radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(22, 24, 27, 0.4), transparent 80%)
					`,
        }}
      />
      <div className="relative flex flex-col rounded-xl border border-white/10">
        <div className="flex flex-row items-center gap-4 space-y-2 p-6">
          {/* <PrismicNextImage
            className="max-h-8 w-8"
            field={logo}
            sizes="(max-width: 640px) 32px, (max-width: 768px) 32px, (max-width: 1024px) 32px, 32px"
          /> */}
          <div className="grid gap-1">
            <H3 className="text-xl">{title}</H3>
            <div className="flex items-center text-sm text-stone-400 md:gap-1">
              {duration.start && (
                <>
                  <CalendarIcon className="mr-1 h-4 w-4 text-stone-400" />
                  {!duration.end && <span>Since</span>}
                  <span>
                    {formatDateToMonthYear(duration.start, languageTag())}
                  </span>
                  {duration.end && (
                    <>
                      <span> - </span>
                      <span>
                        {formatDateToMonthYear(duration.end, languageTag())}
                      </span>
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
                className="text-sm"
                href={link}
                rel={"noopener nofollow"}
              >
                {link.replace(/(^\w+:|^)\/\//, "")}
              </A>
            )}
          </div>
        </div>
        <div className="p-6 pt-0 text-sm leading-[1.5] text-stone-300">
          <p>{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                className="relative inline-flex overflow-hidden rounded-full p-px"
                key={idx}
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
                <span className="inline-flex h-full w-full items-center justify-center rounded-full px-3 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl">
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
