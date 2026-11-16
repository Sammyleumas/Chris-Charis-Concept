import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/config/site";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Chris Charis Concept in Benin City, Edo State, Nigeria.",
};

export default function ContactPage() {
  const { location, contact } = site;
  const place = [location.streetAddress, location.city, location.state, location.country].filter(Boolean).join(", ");
  const mapUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(place)}`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        subtitle="Let’s connect."
        image={images.contactHero}
        crumbs={[{ label: "Contact" }]}
      />
      <section aria-label="Contact details and form" className="py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-h2 font-semibold">Get in touch</h2>
            <ul className="mt-8 space-y-7">
              <li className="flex gap-4">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand-ink" />
                <div>
                  <p className="font-semibold text-ink">Our office</p>
                  <p className="mt-1 text-slate-ink">{place}</p>
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink hover:underline">
                    View on map <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /><span className="sr-only"> (opens OpenStreetMap in a new tab)</span>
                  </a>
                </div>
              </li>
              {contact.phone && (
                <li className="flex gap-4">
                  <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand-ink" />
                  <div>
                    <p className="font-semibold text-ink">Call us</p>
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="mt-1 block text-slate-ink hover:text-ink">{contact.phone}</a>
                  </div>
                </li>
              )}
              {contact.email && (
                <li className="flex gap-4">
                  <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand-ink" />
                  <div>
                    <p className="font-semibold text-ink">Email us</p>
                    <a href={`mailto:${contact.email}`} className="mt-1 block text-slate-ink hover:text-ink">{contact.email}</a>
                  </div>
                </li>
              )}
            </ul>
            {(!contact.email || !contact.phone || !location.streetAddress) && (
              <ContentNote className="mt-8">Official email, phone number, street address and social media handles.</ContentNote>
            )}
          </div>
          <div className="rounded-2xl bg-paper p-6 sm:p-10 lg:col-span-7 lg:col-start-6">
            <h2 className="text-h3 font-semibold">Send us a message</h2>
            <p className="mt-2 mb-8 text-sm text-slate-ink">Fields marked * are required. We reply by email.</p>
            <EnquiryForm kind="contact" submitLabel="Send message" />
          </div>
        </div>
      </section>
    </>
  );
}
