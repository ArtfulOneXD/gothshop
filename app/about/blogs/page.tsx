const posts = [
  {
    title: "Forging a Modern Gothic Wardrobe",
    excerpt: "Layer textures, metals, and silhouettes to build a look that shifts from daylight to midnight.",
  },
  {
    title: "Behind the Scenes: Sketch to Casting",
    excerpt: "How a pencil sketch becomes a finished pendant using lost-wax casting and hand polishing.",
  },
];

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Blogs</h1>
      <p className="mt-3 text-[var(--muted)]">
        Dispatches from the studio, styling guides, and maker stories.
      </p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <div
            key={post.title}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel-strong)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
          >
            <h2 className="text-lg font-semibold text-[var(--foreground)]">{post.title}</h2>
            <p className="mt-2 text-[var(--muted)]">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
