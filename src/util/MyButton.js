import React from 'react'

// MUI
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

const MyButton = (props) => {
    const { children, onClick, tip, btnClassName, tipClassName } = props
    return (
        <Tooltip title={tip} className={tipClassName}>
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    );
}

export default MyButton;


