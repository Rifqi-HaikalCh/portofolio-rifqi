// Type definitions untuk Portfolio

export interface NavLink {
  href: string;
  labelEn: string;
  labelId: string;
}

export interface Skill {
  name: string;
  icon: string;
  color?: string;
  category: 'hard' | 'soft';
}

export interface Experience {
  id: string;
  title: string;
  titleId?: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  descriptionId?: string;
  techStack?: string[];
  type: 'work' | 'organization';
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  descriptionId?: string;
  image: string;
  techStack: string[];
  links: {
    demo?: string;
    github?: string;
    prototype?: string;
    needToKnow?: string;
  };
  category: 'individual' | 'group';
  slides?: string[];
  type?: 'web' | 'mobile' | 'design';
}

export interface Certificate {
  id: string;
  title: string;
  titleId?: string;
  description: string;
  descriptionId?: string;
  link: string;
  category: 'dicoding' | 'kegiatan' | 'organisasi' | 'magang';
}

export interface CertificateCategory {
  id: string;
  title: string;
  titleId: string;
  icon: string;
  count: number;
  certificates: Certificate[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  whatsapp: string;
}

export interface AboutHighlight {
  icon: string;
  title: string;
  titleId: string;
  description: string;
  descriptionId: string;
}

export type Language = 'en' | 'id';