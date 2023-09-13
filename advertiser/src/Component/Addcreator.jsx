import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Addcreator = () => {
    const navigate= useNavigate()

    const handleme = () => {
        navigate("/campaign")
    }

    const handleown = () => {
        navigate("/createown")
    }

  return (
    <div className='App'>
        <h1>Add Creator (select any one)</h1>
        <ul>
          <li>
        <h2 onClick={handleown}>Create Your Own</h2>
          </li>
          <li>
        <h2 onClick={handleme}>Create For Me</h2>
          </li>
        </ul>
    </div>
  )
}
