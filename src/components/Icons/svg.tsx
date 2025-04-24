function Icon({ size = 16, fill = "#bfbfbf", className = '', style, children, ...props }: IconProps & { children?: React.ReactNode }) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            width={size} height={size}
            className={`icon ${className}`}
            style={style}
            fill={fill}
            {...props}
        >
            {children}
        </svg>
    )
}

export function getIcon(children: React.ReactNode, defaultProps: IconProps = {}) {
    return (props: IconProps) => {
        return (
            <Icon {...defaultProps} {...props}>
                {children}
            </Icon>
        )
    }
}