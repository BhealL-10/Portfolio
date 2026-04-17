import type { AboutSectionContent, ContactLink } from '../types/content';

export const aboutSectionContent: AboutSectionContent = {
  title: {
    fr: 'Contact',
    en: 'Contact'
  },
  emailAddress: 'contact.bheall@gmail.com',
  directLabel: {
    fr: 'Adresse directe',
    en: 'Direct email'
  },
  directHint: {
    fr: 'Contacte-moi directement par email à cette adresse.',
    en: 'Contact me directly by email at this address.'
  },
  formTitle: {
    fr: 'Envoyer un message',
    en: 'Send a message'
  },
  formIntro: {
    fr: 'Dis-moi qui tu es, ce qui t’intéresse, et je te prépare un mail propre à envoyer.',
    en: 'Tell me who you are, what you need, and I will prepare a clean email draft for you.'
  },
  fields: {
    name: {
      fr: 'Nom',
      en: 'Name'
    },
    email: {
      fr: 'Email',
      en: 'Email'
    },
    interest: {
      fr: 'Specifie rapidement l’objet de ta prise de contact',
      en: 'What is the subject of your inquiry?'
    },
    message: {
      fr: 'Message',
      en: 'Message'
    }
  },
  placeholders: {
    name: {
      fr: 'Votre nom',
      en: 'Your name'
    },
    email: {
      fr: 'ton@email.com',
      en: 'your@email.com'
    },
    interest: {
      fr: 'Collaboration, commande, devis, question...',
      en: 'Collab, commission, quote, question...'
    },
    message: {
      fr: 'Explique-moi rapidement ce dont tu as besoin.',
      en: 'Tell me a bit about what you need.'
    }
  },
  submitLabel: {
    fr: 'Envoyer',
    en: 'Send'
  }
};

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    href: 'mailto:contact.bheall@gmail.com',
    label: { fr: 'Email', en: 'Email' }
  },
  {
    id: 'github',
    href: 'https://github.com/orgs/ApeProd',
    label: { fr: 'GitHub', en: 'GitHub' }
  },
  {
    id: 'x',
    href: 'https://x.com/BhealLfr',
    label: { fr: 'X', en: 'X' }
  }
];
