import React from 'react'

interface ToggleProps {
    toggleName: string
    setToggle: (toggle: string) => void
    toggle: string
}

const Toggle = ({ toggleName, setToggle, toggle }: ToggleProps) => {
    return (
        <div className={`${toggle === toggleName.toLowerCase() ? 'text-white' : 'text-gray-400'} cursor-pointer font-semibold text-sm`}>
            <h1 onClick={() => setToggle(toggleName.toLowerCase())}>{toggleName}</h1>
        </div>
    )
}

export default Toggle
