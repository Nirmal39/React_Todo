import React from 'react'

function TodoItem({ title,
    desc,
    iscomp,
    updateHandler,
    deleteHandler,
    id,
    }) {
    return (
        <div className='todo'>

            <div>
                <h4>{title}</h4>
                <p>{desc}</p>
            </div>

            <div>
                <input onChange={()=>updateHandler(id)} type='checkbox' checked={iscomp} />
                <button onClick={()=>deleteHandler(id)} className='btn'>Delete</button>
            </div>

        </div>
    )
}

export default TodoItem