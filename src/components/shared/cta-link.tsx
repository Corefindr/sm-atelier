import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
};

export function CtaLink({
  href,
  children,
  className,
  variant = "default",
}: CtaLinkProps) {
  return (
    <Button
      nativeButton={false}
      variant={variant}
      render={<Link href={href} />}
      className={cn(
        "h-12 rounded-none px-8 text-[11px] font-medium tracking-[0.22em] uppercase",
        className,
      )}
    >
      {children}
    </Button>
  );
}
