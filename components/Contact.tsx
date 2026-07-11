'use client';

import { ContactHero } from './contact/ContactHero';
import { ContactInfo } from './contact/ContactInfo';
import { ContactForm } from './contact/ContactForm';

const LINE_STRONG = 'rgba(26,23,18,0.18)';

export default function Contact() {
  return (
    <>
      <ContactHero />
      <section className="side-pad relative z-[2] pb-[60px] pt-6">
        <div
          className="contact-grid grid border bg-paper min-[901px]:grid-cols-[0.95fr_1.05fr]"
          style={{ borderColor: LINE_STRONG }}
        >
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
