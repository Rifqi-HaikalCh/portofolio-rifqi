import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';

const figmaLink = 'https://www.figma.com/proto/tfuZv6wJ89rcjMHj62C8px/Portfolio?page-id=0%3A1&node-id=1-2&p=f&viewport=412%2C255%2C0.04&t=6zl8vTjnEZzdUhRC-1&scaling=contain&content-scaling=fixed&starting-point-node-id=1%3A2';

const PortfolioFigmaCard = () => {
  return (
    <a
      href={figmaLink}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover block border border-line bg-raised"
      aria-label="Lihat Desain Portfolio di Figma"
    >
      <span className="card-hover-media block">
        <Image
          src="/assets/my portfolio.webp"
          alt="My Portfolio Design Workspace"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </span>
      <span className="card-hover-title flex items-center justify-between gap-4 border-t border-line px-4 py-3 text-sm text-ink">
        Lihat meja kerja
        <FiArrowUpRight size={16} />
      </span>
    </a>
  );
};

export default PortfolioFigmaCard;
