import { contactInfo, developerSkills, workExperience } from '../data/portfolio';
import type { ScreenData } from '../components/scene/LaptopScreenUI';
import { displayCase } from './display-case';

/* What the laptop screen shows, built on the server from portfolio.ts. */
export function heroScreen(): ScreenData {
  const current = workExperience[0];
  return {
    role: { en: displayCase(current.title), id: displayCase(current.titleId ?? current.title) },
    company: displayCase(current.company),
    location: contactInfo.location.split(',')[0],
    status: contactInfo.availability,
    stack: developerSkills.filter((skill) => skill.focus === 'core').map((skill) => skill.name),
  };
}
