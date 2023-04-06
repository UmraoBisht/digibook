import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

function Alert() {
    const context = useContext(NoteContext);
    const { alert } = context;
    return (
        <div className='show-alert' style={{ height: "40px" }} >
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert" >
                <strong>{alert.msg}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </div>
    )
}
export default Alert