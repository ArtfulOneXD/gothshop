import Image from "next/image";

const events = [
  {
    title: "Sacramento Arts Festival",
    date: "Feb 22–24",
    location: "Sacramento, CA",
    description:
      "Meet the makers behind Goth Store, preview exclusive pieces, and get styled in person.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Nocturne Night Market",
    date: "Mar 15",
    location: "Portland, OR",
    description:
      "Limited-run pendants, live engraving, and a moody soundtrack under neon lights.",
    image: "https://images.unsplash.com/photo-1438109491414-7198515b166b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Midnight Metals Workshop",
    date: "Apr 6",
    location: "Brooklyn, NY",
    description:
      "Hands-on workshop: learn basic metal stamping and build your own gothic charm.",
    image: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?auto=format&fit=crop&w=800&q=80",
  },
];

export default function EventsPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <header className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0 opacity-30">
          <div className="relative h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=1600&q=80"
              alt="Event crowd"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="relative z-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">Events</p>
          <h1 className="text-3xl font-semibold text-[var(--foreground)]">
            Find us in the wild
          </h1>
          <p className="text-[var(--muted)] max-w-2xl">
            Come see the jewelry up close, meet the team, and get styled at pop-ups and markets
            across the country.
          </p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.title}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel-strong)] shadow-[0_14px_36px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
          >
            <div className="relative h-40 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
                <span>{event.date}</span>
                <span>{event.location}</span>
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">{event.title}</h2>
              <p className="text-sm text-[var(--muted)]">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
