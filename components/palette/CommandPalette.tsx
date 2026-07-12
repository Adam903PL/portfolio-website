'use client';

import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DURATION, EASE_EDITORIAL } from '@/lib/motion';
import { Command, filterCommands, getCommands } from '@/lib/commands';

const LINE = 'rgba(26,23,18,0.28)';

export function CommandPalette() {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const commands = useMemo(() => getCommands(), []);
  const results = useMemo(
    () => filterCommands(commands, query),
    [commands, query],
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setSelected(0);
  }, []);

  const run = useCallback(
    (command: Command) => {
      close();
      const { action } = command;
      if (action.type === 'navigate') router.push(action.href);
      if (action.type === 'open')
        window.open(action.href, '_blank', 'noopener');
      if (action.type === 'copy')
        void navigator.clipboard.writeText(action.text);
      if (action.type === 'event') window.dispatchEvent(new Event(action.name));
    },
    [close, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') close();
    };
    const onToggle = () => setOpen((v) => !v);
    window.addEventListener('keydown', onKey);
    window.addEventListener('toggle-palette', onToggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('toggle-palette', onToggle);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const moveSelection = (next: number) => {
    setSelected(next);
    listRef.current?.children[next]?.scrollIntoView({ block: 'nearest' });
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveSelection(Math.min(selected + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveSelection(Math.max(selected - 1, 0));
    }
    if (e.key === 'Enter' && results[selected]) {
      run(results[selected]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
          style={{ background: 'rgba(26,23,18,0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : DURATION.fast }}
          onClick={close}
        >
          <m.div
            role="dialog"
            aria-label="Command palette"
            className="w-full max-w-[560px] border bg-paper"
            style={{ borderColor: LINE }}
            initial={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -12 }}
            transition={{
              duration: prefersReduced ? 0 : DURATION.medium,
              ease: EASE_EDITORIAL,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-3 border-b px-4 py-3.5"
              style={{ borderColor: 'rgba(26,23,18,0.16)' }}
            >
              <span className="font-mono text-[14px] text-accent">&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search..."
                className="w-full bg-transparent font-mono text-[14px] text-ink outline-none placeholder:text-ink-30"
              />
              <span className="font-mono text-[10px] uppercase text-ink-30">
                esc
              </span>
            </div>
            <ul
              ref={listRef}
              className="no-scrollbar m-0 max-h-[320px] list-none overflow-y-auto p-0"
            >
              {results.length === 0 && (
                <li className="px-4 py-3.5 font-mono text-[13px] text-ink-40">
                  No results.
                </li>
              )}
              {results.map((cmd, i) => (
                <li key={cmd.id}>
                  <button
                    type="button"
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-mono text-[13px]"
                    style={{
                      background:
                        i === selected ? 'var(--color-ink)' : 'transparent',
                      color:
                        i === selected
                          ? 'var(--color-cream)'
                          : 'var(--color-ink)',
                    }}
                  >
                    <span>{cmd.label}</span>
                    <span
                      className="text-[10px] uppercase tracking-[0.06em]"
                      style={{ opacity: 0.5 }}
                    >
                      {cmd.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
