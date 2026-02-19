type ContentFallbackProps = {
  slug: string;
};

export function ContentFallback({ slug }: ContentFallbackProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
        <h1 className="text-2xl font-semibold text-text-primary">Content unavailable</h1>
        <p className="mt-3 text-sm text-text-secondary">
          We could not find MDX content for <code>{slug}</code>. Add the file under{" "}
          <code>content/pages</code> and redeploy.
        </p>
      </div>
    </section>
  );
}
