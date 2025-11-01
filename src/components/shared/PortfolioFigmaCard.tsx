import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';

/**
 * Kartu kustom untuk menampilkan link ke desain portfolio Figma.
 * Menampilkan gambar dengan overlay teks glassmorphism,
 * yang berubah menjadi overlay putih dengan tombol saat di-hover.
 */
const PortfolioFigmaCard = () => {
  // Link Figma dari permintaan
  const figmaLink = "https://www.figma.com/proto/tfuZv6wJ89rcjMHj62C8px/Portfolio?page-id=0%3A1&node-id=1-2&p=f&viewport=412%2C255%2C0.04&t=6zl8vTjnEZzdUhRC-1&scaling=contain&content-scaling=fixed&starting-point-node-id=1%3A2";

  return (
    <a
      href={figmaLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-xl overflow-hidden shadow-lg group border border-gray-200 dark:border-gray-700"
      aria-label="Lihat Desain Portfolio di Figma"
    >
      {/* Background Image */}
      <Image
        src="/assets/my portfolio.webp"
        alt="My Portfolio Design Workspace"
        width={1200}
        height={800}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        loading="lazy"
        quality={90}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
      />

      {/* === State Awal: Glassmorphism Text === */}
      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg
                      backdrop-blur-md bg-black/40 border border-white/20
                      transition-opacity duration-300 ease-in-out group-hover:opacity-0"
           style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
      >
        <h3 className="text-xl font-bold text-white">
          Lihat meja kerja ku!
        </h3>
      </div>

      {/* === State Hover: White Overlay with Button === */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 p-6 flex flex-col justify-center items-center
                     text-center opacity-0 group-hover:opacity-100
                     transition-all duration-300 ease-in-out"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Portfolio Design
        </h3>
        <span
          className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg shadow-md
                     hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Lihat Desain
          <FiArrowUpRight className="ml-2" />
        </span>
      </div>
    </a>
  );
};

export default PortfolioFigmaCard;
