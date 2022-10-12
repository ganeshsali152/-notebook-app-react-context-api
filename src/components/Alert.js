import React from 'react'

const Alert = (props) => {
    return (
        <div style={{ height: '50px' }}>
            {props.alert &&
                <div className={`alert alert-${props.alert.type}`} role="alert">
                    <strong>{props.alert.msg}</strong>
                </div>
            }
        </div>
    )
}

export default Alert