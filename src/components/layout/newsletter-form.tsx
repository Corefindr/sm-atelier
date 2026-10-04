"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? "success" : "error");
  }

  if (status === "success") {
    return (
      <p role="status" className="text-sm text-ivory">
        Thank you. You are on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
            }
          }}
          placeholder="Email address"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className="h-11 rounded-none border-ivory/30 bg-transparent text-ivory placeholder:text-ivory/50"
        />
        <Button
          type="submit"
          variant="secondary"
          className="h-11 rounded-none px-4 tracking-[0.16em] uppercase"
        >
          Join
        </Button>
      </div>
      {status === "error" ? (
        <p id="newsletter-error" className="text-sm text-stone">
          Enter a valid email address.
        </p>
      ) : (
        <p className="text-xs leading-5 text-ivory/70">
          Notes on new edits and studio stories. No noise.
        </p>
      )}
    </form>
  );
}
