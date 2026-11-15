import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterBand() {
  return (
    <section aria-labelledby="newsletter-title" className="bg-mist py-20">
      <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-brand-ink">Newsletter</p>
          <h2 id="newsletter-title" className="mt-3 text-h2 font-semibold">Follow the story.</h2>
          <p className="mt-4 max-w-md text-slate-ink">
            New films, project updates and ways to take part, sent a few times a year.
          </p>
        </div>
        <div className="w-full max-w-lg min-w-0 lg:justify-self-end">
          <NewsletterForm tone="light" />
        </div>
      </div>
    </section>
  );
}
