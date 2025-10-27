import { useMemo, useState } from 'react';
import { Search, Tag } from 'lucide-react';

export default function NotesPanel({ notes }) {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);

  const allTags = useMemo(() => {
    const set = new Set();
    notes.forEach((n) => n.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [notes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter((n) => {
      const matchesQuery = !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q);
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => n.tags?.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [notes, query, activeTags]);

  const toggleTag = (tag) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by text..."
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Tag className="h-3 w-3" /> Tags:</span>
          {allTags.length === 0 ? (
            <span className="text-xs text-muted-foreground">No tags yet</span>
          ) : (
            allTags.map((t) => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`text-xs rounded-full px-3 py-1 border transition-colors ${
                  activeTags.includes(t)
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {t}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((note) => (
          <article key={note.id} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-4">
            <h3 className="font-semibold text-lg leading-snug">{note.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{note.summary}</p>
            {note.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {note.tags.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-wide rounded-full border border-black/10 dark:border-white/10 px-2 py-1 text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-3 text-xs text-muted-foreground">
              {new Date(note.createdAt).toLocaleString()}
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-8">
            No notes match your search.
          </div>
        )}
      </div>
    </div>
  );
}
