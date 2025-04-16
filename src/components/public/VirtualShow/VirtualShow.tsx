import React, { FC, JSX, useEffect, useRef, useState } from 'react';

type VirtualShowProps = JSX.IntrinsicElements['div'] & {
}

const VirtualShow: FC<VirtualShowProps> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      {...(isVisible ? props : {})}
      ref={ref}
      className={isVisible ? props.className : undefined}
      style={
        isVisible
          ? props.style :
          {
            height: 'var(--fileTree-item-height)',
            width: '100%'
          }
      }
    >
      {isVisible ? children : null}
    </div>
  );

};

export default VirtualShow;
