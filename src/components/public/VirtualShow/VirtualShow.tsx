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

    const refCurrent = ref.current;
    if (refCurrent) {
      observer.observe(refCurrent);
    }

    return () => {
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, []);

  return (
    <div
      {...(
        isVisible
          ? props
          // 保留以 file- 开头的属性
          : Object.entries(props)
            .filter(([key]) => key.startsWith('file-'))
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {} as Record<string, any>)
      )}
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
