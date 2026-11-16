import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ButtonEyes } from "./ButtonEyes";

type Variant = "primary" | "outline" | "outline-light" | "ghost" | "light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "btn-primary bg-brand-ink text-white hover:bg-brand-deep",
  outline: "btn-outline border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-light": "btn-outline-light border border-white/60 text-white hover:bg-white hover:text-ink",
  ghost: "btn-ghost text-brand-ink hover:text-brand-deep px-0!",
  light: "btn-light bg-white text-ink hover:bg-mist",
};

/* Less padding on the right, where the eyes sit close to the edge. */
const sizes: Record<Size, string> = {
  md: "h-11 pl-5 pr-2.5 text-sm",
  lg: "h-13 pl-7 pr-3 text-[0.95rem]",
};

export const buttonClasses = (variant: Variant = "primary", size: Size = "md") =>
  cn(
    "group inline-flex items-center justify-center gap-3 rounded-full font-semibold whitespace-nowrap",
    "tap focus-visible:outline-offset-4",
    variants[variant],
    sizes[size],
  );

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with an outbound-link icon. */
  external?: boolean;
  /** Shows the pointer-following eyes (on by default). */
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  arrow = true,
  className,
  ...rest
}: Props) {
  const content = (
    <>
      <span className="inline-flex items-center gap-1.5">
        {children}
        {external && <ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
      </span>
      {arrow && <ButtonEyes size={size} />}
    </>
  );
  const classes = cn(buttonClasses(variant, size), className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
