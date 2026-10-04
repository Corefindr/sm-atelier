import type { Metadata } from "next";

import { CtaLink } from "@/components/shared/cta-link";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = {
  title: "Account",
  description: "Your SM Atelier account.",
};

export default function AccountPage() {
  return (
    <>
      <PageIntro
        eyebrow="Account"
        title="Welcome back"
        description="Sign-in, saved orders and addresses will arrive with Supabase. The house is open to browse until then."
      />
      <div className="px-5 py-16 text-center">
        <CtaLink href="/shop">Continue browsing</CtaLink>
      </div>
    </>
  );
}
