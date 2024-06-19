import React from 'react'
import { PlacesType, Tooltip } from 'react-tooltip'
const TooltipComp = ({ children = <></>, id = '', place , className='' }: { children?: React.ReactElement, id: string, place:PlacesType, className?:string }) => {
    return (
        <Tooltip
            id={id}
            place={place}
            className={className}
        >
            {children}
        </Tooltip>
    )
}

export default TooltipComp;
