import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Floating = ({ position, children, zIndex = 999 }: {
    position: { top: number, left: number }
    zIndex?: number
    children: React.ReactNode
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex,
    });

    useLayoutEffect(() => {
        if (ref.current?.firstElementChild) {
            const rect = ref.current?.firstElementChild.getBoundingClientRect();
            setStyle(s => ({
                ...s,
                top: Math.min(position.top, window.innerHeight - rect.height - 10),
                left: Math.min(position.left, window.innerWidth - rect.width - 10),
            }));
        }
    }, [position]);

    return createPortal(
        <div style={style} ref={ref}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
        >
            {children}
        </div>,
        document.body
    );
};