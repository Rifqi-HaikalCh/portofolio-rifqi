"use client";

import Image from 'next/image';
import '../../styles/GlassSkillCard.css';

interface GlassSkillCardProps {
  name: string;
  image: string;
}

const GlassSkillCard: React.FC<GlassSkillCardProps> = ({ name, image }) => {
  return (
    <div className="glass-skill-card">
      <div className="card-content">
        <Image
          src={image}
          alt={`${name} logo`}
          width={64}
          height={64}
          className="skill-logo"
          loading="lazy"
        />
        <p className="skill-name">{name}</p>
      </div>
    </div>
  );
};

export default GlassSkillCard;
