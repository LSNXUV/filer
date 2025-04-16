
import TransitiveHeightContainer from '@/components/public/TransitiveHeightContainer'
import React, { memo } from 'react'
import { Tree } from '../..'

const Children = memo(({ expand, children, level }: {
    expand: boolean,
    children: Files['children'],
    level: number
}) => {
    return (
        <TransitiveHeightContainer
            expanded={expand}
        >
            {children.map((file, index) => (
                <Tree key={index} files={file} level={level + 1} />
            ))}
        </TransitiveHeightContainer>
    )
})

export default Children