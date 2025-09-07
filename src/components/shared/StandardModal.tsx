'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface StandardModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const StandardModal: React.FC<StandardModalProps> = ({ isOpen, onClose, children, title, maxWidth = 'md', className = '' }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !isBrowser) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md md:max-w-2xl',
    lg: 'max-w-lg md:max-w-3xl',
    xl: 'max-w-xl md:max-w-4xl',
    '2xl': 'max-w-2xl md:max-w-6xl'
  };

  const modalContent = (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none p-4"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div
          className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] mx-auto my-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 dark:border-gray-700 rounded-t">
            {title && (
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black dark:text-white opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:opacity-100"
              onClick={onClose}
              aria-label="Close modal"
            >
              <span className="h-6 w-6 text-2xl block">×</span>
            </button>
          </div>

          <div className="relative p-6 flex-auto overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default StandardModal;