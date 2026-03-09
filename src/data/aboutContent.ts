import type { AboutSectionContent, ContactLink } from '../types/content';

export const aboutSectionContent: AboutSectionContent = {
  title: {
    fr: 'À propos',
    en: 'About'
  },
  paragraphs: [
    {
      fr: 'Passionné par la création sous toutes ses formes, je combine développement web, réalisation audiovisuelle, montage vidéo et design graphique pour donner vie à des projets uniques.',
      en: 'Passionate about creation in all its forms, I combine web development, audiovisual production, video editing, and graphic design to bring unique projects to life.'
    },
    {
      fr: 'Mon approche multidisciplinaire me permet de créer des expériences complètes, de la conception à la réalisation.',
      en: 'My multidisciplinary approach allows me to create complete experiences, from concept to delivery.'
    }
  ],
  skills: [
    {
      title: { fr: 'Développement', en: 'Development' },
      body: { fr: 'JavaScript, React, Three.js, Node.js, Ruby on Rails', en: 'JavaScript, React, Three.js, Node.js, Ruby on Rails' }
    },
    {
      title: { fr: 'Réalisation', en: 'Production' },
      body: { fr: 'Direction artistique, scénarisation, storyboarding', en: 'Art direction, scriptwriting, storyboarding' }
    },
    {
      title: { fr: 'Vidéo', en: 'Video' },
      body: { fr: 'Montage, motion design, VFX, color grading', en: 'Editing, motion design, VFX, color grading' }
    },
    {
      title: { fr: 'Graphisme', en: 'Design' },
      body: { fr: 'UI/UX, branding, illustration, design system', en: 'UI/UX, branding, illustration, design systems' }
    }
  ],
  contactTitle: {
    fr: 'Contact',
    en: 'Contact'
  },
  contactText: {
    fr: 'Intéressé par une collaboration ? N’hésitez pas à me contacter.',
    en: 'Interested in collaborating? Feel free to reach out.'
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
