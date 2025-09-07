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
    md: 'max-w-full sm:max-w-md md:max-w-2xl',
    lg: 'max-w-full sm:max-w-lg md:max-w-3xl',
    xl: 'max-w-full sm:max-w-xl md:max-w-4xl',
    '2xl': 'max-w-full sm:max-w-2xl md:max-w-5xl lg:max-w-6xl'
  };

  const modalContent = (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div
          className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[95vh] sm:max-h-[90vh] mx-auto my-2 sm:my-6 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-2xl flex flex-col ${className} animate-fadeIn`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Responsive Header */}
          <div className="flex items-start justify-between p-3 sm:p-5 border-b border-solid border-gray-200 dark:border-gray-700 rounded-t">
            {title && (
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white pr-4 leading-tight">
                {title}
              </h3>
            )}
            <button
              className="p-1 sm:p-2 ml-auto bg-transparent border-0 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Responsive Content */}
          <div className="relative p-3 sm:p-4 lg:p-6 flex-auto overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default StandardModal;