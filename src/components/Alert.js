import React from 'react'

const Alert = (props) => {
    return (
        <div className={`alert alert-${props.alert.type}`} role="alert" style={{width:"100%",position:"absolute",height:"50px"}}>
            {props.alert.msg}
        </div>
    )
}

export default Alert