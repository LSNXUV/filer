
import TransitiveHeightContainer from '@/components/public/TransitiveHeightContainer'
import React, { memo } from 'react'
import { Tree } from '../..'

const Children = memo(({ expand, data, level }: {
    expand: boolean,
    data: Files['children'],
    level: number
}) => {
    return (
        <TransitiveHeightContainer
            expanded={expand}
        >
            {data.map((file, _) => (
                <Tree key={file.path} files={file} level={level + 1} />
            ))}
        </TransitiveHeightContainer>
    )
})

Children.displayName = 'Children';
export default Children