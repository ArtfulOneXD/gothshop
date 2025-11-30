const faqs = [
  {
    question: "When will my order ship?",
    answer:
      "Most orders ship within 2 business days. You will receive a tracking link as soon as it leaves our studio.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. Duties and taxes vary by destination and are calculated at checkout where available.",
  },
  {
    question: "Can I modify my order after placing it?",
    answer:
      "Contact us within 12 hours of purchase and we will do our best to update sizing, address, or quantities before fulfillment.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <p className="mt-2 text-[var(--muted)]">
        Quick answers to the most common questions about shopping with us.
      </p>

      <div className="mt-8 space-y-5">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
          >
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              {faq.question}
            </h2>
            <p className="mt-2 text-[var(--muted)]">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
