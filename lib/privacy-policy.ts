export const PRIVACY_POLICY_PATH = '/privacy-policy';
export const PRIVACY_POLICY_MARKDOWN_PATH = '/privacy-policy.md';
export const PRIVACY_POLICY_LAST_UPDATED = '2026-06-07';

export const privacyPolicySummary =
  'Privacy policy for Adam Pukaluk portfolio, explaining contact form data, email delivery through Resend, Vercel hosting logs and GDPR rights.';

export type PrivacyPolicyItem = {
  heading: string;
  body: string[];
};

export type PrivacyPolicySection = {
  language: 'pl' | 'en';
  eyebrow: string;
  title: string;
  intro: string;
  items: PrivacyPolicyItem[];
};

export const privacyPolicyReferences = [
  {
    label: 'European Commission - GDPR information for individuals',
    href: 'https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en',
  },
  {
    label: 'UODO - rights under GDPR',
    href: 'https://uodo.gov.pl/pl/493/4098',
  },
  {
    label: 'Resend Security',
    href: 'https://resend.com/security',
  },
  {
    label: 'Resend Privacy Policy',
    href: 'https://resend.com/legal/privacy-policy',
  },
  {
    label: 'Vercel Privacy Notice',
    href: 'https://vercel.com/legal/privacy-notice',
  },
] as const;

export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    language: 'pl',
    eyebrow: 'Polityka prywatnosci',
    title: 'Polityka prywatnosci',
    intro:
      'Ta informacja opisuje, jakie dane sa przetwarzane na stronie adampukaluk.pl i w jakim celu. Strona jest portfolio osobistym i nie prowadzi newslettera ani marketingowego profilowania.',
    items: [
      {
        heading: 'Administrator danych',
        body: [
          'Administratorem danych jest Adam Pukaluk. Kontakt w sprawach prywatnosci: pukaluk.adam505@gmail.com.',
          'Nie zostal wyznaczony inspektor ochrony danych, poniewaz strona jest osobistym portfolio.',
        ],
      },
      {
        heading: 'Jakie dane przetwarzam',
        body: [
          'Formularz kontaktowy przetwarza: imie, nazwisko, adres e-mail, opcjonalny numer telefonu oraz tresc wiadomosci.',
          'Poza formularzem moga powstawac techniczne logi serwera zwiazane z hostingiem strony, np. adres IP, czas zadania, diagnostyka i informacje o bledach.',
        ],
      },
      {
        heading: 'Cel i podstawa przetwarzania',
        body: [
          'Dane z formularza sa uzywane tylko po to, aby odpowiedziec na wiadomosc, obsluzyc kontakt i ewentualnie ustalic szczegoly wspolpracy.',
          'Podstawa prawna to uzasadniony interes administratora polegajacy na obsludze korespondencji oraz dzialania przed nawiazaniem wspolpracy, jezeli wiadomosc dotyczy projektu lub uslugi.',
        ],
      },
      {
        heading: 'Dostawcy uslug',
        body: [
          'Wiadomosci z formularza sa wysylane przez Resend, czyli dostawce uslugi e-mail. Resend moze przetwarzac tresc wiadomosci i dane kontaktowe potrzebne do dostarczenia maila.',
          'Strona jest hostowana na Vercel. Vercel moze przetwarzac dane techniczne i logi potrzebne do zapewnienia bezpieczenstwa, diagnostyki oraz dzialania strony.',
        ],
      },
      {
        heading: 'Cookies, analityka i linki zewnetrzne',
        body: [
          'Strona nie korzysta obecnie z wlasnego Google Analytics, Vercel Analytics ani marketingowych cookies. Nie jest dodawany cookie banner.',
          'Linki do GitHuba, LinkedIna, X/Twittera, Spotify, Google Maps lub innych stron zewnetrznych prowadza do uslug, ktore moga miec wlasne zasady prywatnosci.',
        ],
      },
      {
        heading: 'Okres przechowywania',
        body: [
          'Wiadomosci kontaktowe sa przechowywane domyslnie do 12 miesiecy, chyba ze rozmowa przejdzie w realna wspolprace albo istnieje uzasadniona potrzeba dluzszego przechowania korespondencji.',
        ],
      },
      {
        heading: 'Twoje prawa',
        body: [
          'Masz prawo dostepu do danych, sprostowania, usuniecia, ograniczenia przetwarzania, przeniesienia danych oraz sprzeciwu wobec przetwarzania.',
          'Masz takze prawo wniesienia skargi do Prezesa Urzedu Ochrony Danych Osobowych, jezeli uznasz, ze dane sa przetwarzane niezgodnie z prawem.',
        ],
      },
    ],
  },
  {
    language: 'en',
    eyebrow: 'Privacy Policy',
    title: 'Privacy Policy',
    intro:
      'This notice explains what personal data is processed on adampukaluk.pl and why. The website is a personal portfolio and does not run a newsletter or marketing profiling.',
    items: [
      {
        heading: 'Data controller',
        body: [
          'The data controller is Adam Pukaluk. Privacy contact: pukaluk.adam505@gmail.com.',
          'No data protection officer has been appointed because this website is a personal portfolio.',
        ],
      },
      {
        heading: 'Data I process',
        body: [
          'The contact form processes: first name, last name, email address, optional phone number and message content.',
          'Technical hosting logs may also be created, such as IP address, request time, diagnostics and error information.',
        ],
      },
      {
        heading: 'Purpose and legal basis',
        body: [
          'Contact form data is used only to reply to your message, handle contact and optionally discuss collaboration details.',
          'The legal basis is legitimate interest in handling correspondence and steps prior to possible collaboration when your message concerns a project or service.',
        ],
      },
      {
        heading: 'Service providers',
        body: [
          'Contact messages are sent through Resend, an email delivery provider. Resend may process the message content and contact details needed to deliver the email.',
          'The website is hosted on Vercel. Vercel may process technical data and logs needed for security, diagnostics and website operation.',
        ],
      },
      {
        heading: 'Cookies, analytics and external links',
        body: [
          'The website currently does not use first-party Google Analytics, Vercel Analytics or marketing cookies. No cookie banner is added.',
          'External links to GitHub, LinkedIn, X/Twitter, Spotify, Google Maps or other websites lead to services with their own privacy rules.',
        ],
      },
      {
        heading: 'Retention',
        body: [
          'Contact messages are retained by default for up to 12 months, unless the conversation becomes real collaboration or there is a justified need to keep the correspondence longer.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You have the right to access, rectify, erase, restrict processing, transfer your data and object to processing.',
          'You may also lodge a complaint with the Polish Data Protection Authority if you believe your data is processed unlawfully.',
        ],
      },
    ],
  },
];
