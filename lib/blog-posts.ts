export type BlogImage = {
  src: string;
  alt: string;
  position?: string;
  orientation?: 'landscape' | 'portrait';
};

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
  gallery?: BlogImage[];
  linkedInUrl: string;
  canonicalPath: `/blog/${string}`;
  lastModified: string;
  tags: string[];
  content: string[];
};

export const getBlogPostImages = (post: BlogPost): BlogImage[] =>
  post.gallery?.length
    ? post.gallery
    : [
        {
          src: post.image,
          alt: post.imageAlt,
          position: post.imagePosition,
          orientation: 'landscape',
        },
      ];

export const blogPosts: BlogPost[] = [
  {
    id: '7473078192002707458',
    slug: 'it-unplugged-2026',
    title: 'IT Unplugged: technologia, biznes i networking',
    kicker: 'IT Unplugged / Networking / Techni Schools',
    excerpt:
      'Dobrze spędzony dzień na IT Unplugged: konkretne rozmowy, nowe perspektywy i bardzo mocny networkingowy klimat.',
    source: 'LinkedIn',
    publishedLabel: 'LinkedIn post',
    image: '/img/blog/it-unplugged-2026/hero.jpeg',
    imageAlt:
      'Adam Pukaluk and Sebastian Mysakowski standing in front of the IT Unplugged event wall.',
    imagePosition: 'center',
    gallery: [
      {
        src: '/img/blog/it-unplugged-2026/hero.jpeg',
        alt: 'Adam Pukaluk and Sebastian Mysakowski standing in front of the IT Unplugged event wall.',
        position: 'center',
        orientation: 'portrait',
      },
      {
        src: '/img/blog/it-unplugged-2026/stage-fireside.jpg',
        alt: 'IT Unplugged fireside chat stage about AI agents and banking.',
        position: 'center',
        orientation: 'landscape',
      },
      {
        src: '/img/blog/it-unplugged-2026/motivation-slide.jpg',
        alt: 'Motivation formula slide shown on the IT Unplugged stage.',
        position: 'center',
        orientation: 'portrait',
      },
      {
        src: '/img/blog/it-unplugged-2026/vip-badge.jpg',
        alt: 'Adam Pukaluk IT Unplugged VIP badge from CSK Lublin.',
        position: 'center',
        orientation: 'portrait',
      },
      {
        src: '/img/blog/it-unplugged-2026/theprotocol-stand.jpg',
        alt: 'The Protocol IT stand at IT Unplugged.',
        position: 'center',
        orientation: 'portrait',
      },
      {
        src: '/img/blog/it-unplugged-2026/stage-performance.jpg',
        alt: 'Dance performance on the IT Unplugged stage.',
        position: 'center',
        orientation: 'portrait',
      },
    ],
    linkedInUrl:
      'https://www.linkedin.com/posts/adam-pukaluk_itunplugged-it-technologia-ugcPost-7473078192002707458-jQHh/',
    canonicalPath: '/blog/it-unplugged-2026',
    lastModified: '2026-06-18',
    tags: [
      'ITUnplugged',
      'IT',
      'Technologia',
      'Networking',
      'Cybersecurity',
      'SoftwareDevelopment',
    ],
    content: [
      'Dziś miałem okazję uczestniczyć w wydarzeniu [IT UNPLUGGED](https://www.linkedin.com/company/it-unplugged/) i był to naprawdę dobrze spędzony dzień.',
      'Całe wydarzenie miało bardzo dobrą energię. Dużo konkretnych rozmów, ciekawych perspektyw i ludzi, z którymi można było porozmawiać nie tylko o technologii, ale też o tym, jak wygląda branża od środka.',
      'Cały dzień spędziłem w świetnym towarzystwie [Sebastian Mysakowski](https://www.linkedin.com/in/smysakowski/) oraz [Michał Żyszkiewicz](https://www.linkedin.com/in/michalzyszkiewicz/), co zdecydowanie dodało temu wydarzeniu jeszcze lepszego klimatu.',
      'Szczególne podziękowania kieruję również do [Sławek Sobótka](https://www.linkedin.com/in/ssobot/), który od wielu lat wspiera Niepubliczne Technikum Programistyczne Techni Schools przy różnych działaniach. Tym razem to wsparcie miało bardzo konkretny wymiar w postaci wejściówki na IT Unplugged, dzięki której mogłem uczestniczyć w tym wydarzeniu.',
      'To było najlepsze wydarzenie tego typu, w jakim do tej pory uczestniczyłem. Organizacyjnie, merytorycznie i networkingowo stało na bardzo wysokim poziomie. Jestem pewien, że jeszcze nie raz się tam pojawię.',
      'PS Pozdrawiam Pana ze stanowiska [theprotocol.it](https://www.linkedin.com/company/theprotocol/).',
      '#ITUnplugged #IT #Technologia #Networking #BranzaIT #Cybersecurity #SoftwareDevelopment #KarieraWIT #TheProtocolIT',
    ],
  },
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
