'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Warsaw',
  hour: '2-digit',
  minute: '2-digit',
});

export function StatusLine() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[12px] text-ink-40">
      {time ?? '--:--'} in Lublin - currently building ORB
      <span className="ml-1 inline-block h-[12px] w-[7px] animate-[blink_1.2s_steps(1)_infinite] bg-accent align-middle" />
    </span>
  );
}
