import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NoteComposer from './components/NoteComposer';
import NotesPanel from './components/NotesPanel';

export default function App() {
  const [notes, setNotes] = useState(() => [
    {
      id: crypto.randomUUID(),
      title: 'Welcome to SmartNotes AI',
      content:
        'SmartNotes AI helps you summarize long notes and automatically tag topics so you can find things instantly.',
      summary:
        'SmartNotes AI summarizes long notes and auto-tags topics so you can find things instantly.',
      tags: ['ai', 'notes', 'summary', 'tags'],
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleCreate = (note) => {
    setNotes((prev) => [
      { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...note },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <main>
        <Hero />
        <section className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-3">Create a note</h2>
            <NoteComposer onCreate={handleCreate} />
            <div className="mt-4 text-xs text-muted-foreground">
              Authentication and AI processing will be connected to the API in the next step.
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-3">Your notes</h2>
            <NotesPanel notes={notes} />
          </div>
        </section>
      </main>
      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} SmartNotes AI</span>
          <span>Summarize • Auto-tag • Search</span>
        </div>
      </footer>
    </div>
  );
}
