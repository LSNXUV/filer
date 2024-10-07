import { createPortal } from "react-dom";

export const Floating = ({ show = true, position, children ,zIndex = 999}: {
    show?: boolean
    position: { top: number, left: number }
    zIndex?: number
    children: React.ReactNode
}) => {
    if (!show) return null;

    const style: React.CSSProperties = {
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex,
    };

    return createPortal(
        <div style={style}
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