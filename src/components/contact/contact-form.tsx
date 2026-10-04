"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message.length > 0;
    setStatus(valid ? "success" : "error");
  }

  if (status === "success") {
    return (
      <p role="status" className="text-base leading-7 text-taupe">
        Thank you. The studio will read your note. This preview does not send
        email yet.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="text-[11px] tracking-[0.18em] uppercase">
          Name
        </label>
        <Input id="name" name="name" required className="h-11 rounded-none bg-ivory" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-[11px] tracking-[0.18em] uppercase">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={status === "error"}
          className="h-11 rounded-none bg-ivory"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-[11px] tracking-[0.18em] uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-none border border-input bg-ivory px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          Add a valid email and a short message.
        </p>
      ) : null}
      <Button type="submit" className="h-12 rounded-none px-8 tracking-[0.2em] uppercase">
        Send note
      </Button>
    </form>
  );
}
