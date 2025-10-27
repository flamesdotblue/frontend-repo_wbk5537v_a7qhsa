import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

export default function NoteComposer({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const canSubmit = useMemo(() => title.trim() && content.trim(), [title, content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Lightweight client-side preview of summary/tags (no backend calls here)
    const summary = createSummary(content);
    const tags = extractTags(`${title} ${content}`);

    onCreate({ title: title.trim(), content: content.trim(), summary, tags });
    setTitle('');
    setContent('');
  };

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your text here..."
            rows={6}
            className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            AI will generate a brief summary and topic tags when you add the note.
          </p>
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm shadow hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Add note
          </button>
        </div>
      </form>
    </div>
  );
}

function createSummary(text) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= 160) return clean;
  return clean.slice(0, 157) + '...';
}

function extractTags(text) {
  const stop = new Set(['the','a','an','and','or','of','in','on','for','to','with','by','is','it','this','that','as','at','be','are','was','were','from','your']);
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2 && !stop.has(w))
        .slice(0, 8)
    )
  );
}
