interface EmptyStateProps {
  title: string;
  hint?: string;
}

/** Estado vazio (nenhuma busca feita ou nenhum resultado). */
export default function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <section
      aria-labelledby="empty-state-title"
      className="flex flex-col items-center gap-2 py-16 text-center"
    >
      <span aria-hidden="true" className="text-4xl">
        🌍
      </span>
      <h2 id="empty-state-title" className="text-lg font-semibold text-white/80">
        {title}
      </h2>
      {hint && <p className="text-sm text-white/70">{hint}</p>}
    </section>
  );
}
