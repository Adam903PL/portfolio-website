export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  source: string;
  publishedLabel: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  linkedInUrl: string;
  canonicalPath: `/blog/${string}`;
  lastModified: string;
  tags: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: '7450267832547799040',
    slug: 'civil42-hackathon',
    title: 'Civil42 Hackathon: 24h kodowania',
    kicker: 'Hackathon / Dual-use / TechniSchools',
    excerpt:
      'Maraton kodowania, burz mózgów i totalnego skupienia. Projekty dual-use, presja czasu i zespół, który dowiózł.',
    source: 'LinkedIn',
    publishedLabel: 'LinkedIn post',
    image: '/img/blog/civil42-hackathon.jpg',
    imageAlt:
      'Adam Pukaluk with the Civil42 hackathon team in front of a brick wall.',
    imagePosition: 'center',
    linkedInUrl:
      'https://www.linkedin.com/feed/update/urn:li:share:7450267832547799040/',
    canonicalPath: '/blog/civil42-hackathon',
    lastModified: '2026-06-04',
    tags: ['Civil42', 'Hackathon', 'TechniSchools', 'Cybersecurity'],
    content: [
      'Niezwykłe 24h za mną - maraton kodowania, burz mózgów i totalnego skupienia. ⚡',
      'Właśnie wróciłem z hackathonu #Civil42 i dalej ciężko wrócić do „normalnego trybu”.',
      'To wydarzenie to coś więcej niż zwykły hackathon - tworzyliśmy rozwiązania z obszaru dual-use, czyli takie, które mogą działać zarówno w codziennym życiu, jak i w sytuacjach kryzysowych. Projekty, które realnie mogą mieć wpływ na bezpieczeństwo ludzi i całych społeczności.',
      'Ponad 24 godziny bez przerwy - były momenty zwątpienia, zmiany koncepcji w ostatniej chwili i szybkie decyzje pod presją... ale finalnie dowieźliśmy. 🔥',
      'Jako uczeń Niepublicznego Technikum Programistycznego Techni Schools 💜 jeszcze bardziej doceniam takie doświadczenia - to totalnie inny poziom nauki niż szkolne zadania. Realny problem, realne ograniczenia i realne konsekwencje decyzji.',
      'Najbardziej wynoszę z tego:',
      '👉 Praca pod presją czasu = szybkie, konkretne decyzje',
      '👉 Upadki są częścią procesu - ważne, żeby szybko się podnieść i iść dalej',
      '👉 W 24h da się zrobić więcej niż myślisz, jeśli masz dobry team',
      'Ogromne dzięki dla organizatorów Civil42 za klimat, poziom i możliwość pracy nad czymś, co ma sens 🙌',
      'I oczywiście wielkie propsy dla mojego zespołu - mega robota 👇',
      '👉 Tymoteusz Mosiołek',
      '👉 Marcel Geba',
      '👉 Jakub Mazurek',
      '👉 Mateusz Kozłowski',
      '👉 Szymon Sidor',
      'Klawiatury ostygły, ale głowa dalej pełna pomysłów. To na pewno nie ostatni hackathon 🚀',
      '#hackathon #Civil42 #TechniSchools #programming #IT #dualuse #cybersecurity #innovation #softwaredevelopment #startup',
    ],
  },
  {
    id: '7466488797933932545',
    slug: 'vibe-coding-techni-schools',
    title: 'Vibe Coding w Techni Schools',
    kicker: 'AI tools / Education / Developer workflow',
    excerpt:
      'Wykład o tym, jak AI zmienia pracę programisty i dlaczego fundamenty nadal są ważniejsze niż samo klikanie w narzędzia.',
    source: 'LinkedIn',
    publishedLabel: 'LinkedIn post',
    image: '/img/blog/vibe-coding-lecture.jpg',
    imageAlt:
      'Adam Pukaluk presenting Vibe Coding to students at Techni Schools.',
    imagePosition: 'center',
    linkedInUrl:
      'https://www.linkedin.com/feed/update/urn:li:share:7466488797933932545/',
    canonicalPath: '/blog/vibe-coding-techni-schools',
    lastModified: '2026-06-04',
    tags: ['VibeCoding', 'AI', 'Codex', 'TechEducation'],
    content: [
      'Miałem przyjemność poprowadzić wykłady na temat Vibe Codingu w Niepubliczne Technikum Programistyczne Techni Schools 🚀',
      'Podczas spotkania rozmawialiśmy o tym, jak wygląda praca współczesnego programisty i jak dynamicznie zmienia się branża IT dzięki narzędziom opartym o AI. Pokazywałem w praktyce rozwiązania takie jak Lovable, Antigravity, Codex czy Claude Code, które już dziś znacząco przyspieszają proces tworzenia oprogramowania.',
      'Jednocześnie podkreślałem jedną bardzo ważną rzecz: choć narzędzia AI stają się coraz potężniejsze, to nie zastąpią solidnych podstaw. Jeśli ktoś chce wejść do branży IT i rozwijać się jako programista, powinien najpierw zrozumieć fundamenty: programowanie, algorytmy, struktury danych, architekturę aplikacji czy zasady tworzenia dobrego kodu.',
      'AI może być świetnym akceleratorem nauki i pracy, ale dopiero w rękach osoby, która rozumie, co dzieje się „pod maską”.',
      'Dziękuję wszystkim uczestnikom za aktywność, ciekawe pytania i świetną atmosferę.',
      '#VibeCoding #AI #ArtificialIntelligence #Programming #SoftwareDevelopment #Codex #ClaudeCode #Lovable #TechEducation #FutureOfWork #Developer #Programowanie #IT #Edukacja #Techischools',
    ],
  },
];
