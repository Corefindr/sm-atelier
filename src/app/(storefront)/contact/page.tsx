import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to SM Atelier about an order, a fit question, or a piece you love.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Studio"
        title="Contact"
        description="Questions on fit, an occasion, or a piece you have your eye on."
      />
      <div className="mx-auto grid max-w-5xl gap-16 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-2">
        <ContactForm />
        <div className="space-y-10 text-sm leading-7 text-taupe">
          <section id="shipping">
            <h2 className="font-serif text-2xl text-ink">Shipping</h2>
            <p className="mt-3">
              Free shipping across India on orders above ₹2,499. Dispatch
              details will appear with each order once checkout is live.
            </p>
          </section>
          <section id="exchanges">
            <h2 className="font-serif text-2xl text-ink">Exchanges</h2>
            <p className="mt-3">
              If a size is not quite right, the studio will arrange an easy
              exchange. The full window will be confirmed at checkout.
            </p>
          </section>
          <section id="whatsapp">
            <h2 className="font-serif text-2xl text-ink">WhatsApp support</h2>
            <p className="mt-3">
              Styling notes and order questions will be available on WhatsApp.
              Until that line is connected, write to the studio here.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
