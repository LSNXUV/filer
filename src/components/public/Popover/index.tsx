import React, { useState, useRef, useEffect } from 'react';

type PopoverProps = {
  content: React.ReactNode | string;
  children: React.ReactNode | null;
};

const Popover: React.FC<PopoverProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ display: 'inline-block', position: 'relative' }}
      ref={triggerRef}
    >
      <div 
        // onMouseEnter={toggleVisibility}
        // onMouseLeave={toggleVisibility}
        onClick={toggleVisibility}
      >{children}</div>
      {isVisible && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            border: '1px solid #ccc',
            backgroundColor: '#545252',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '8px',
            borderRadius: '4px',
            marginTop: '4px',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;