'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

type Props = {
    id: string
    label: string
    type?: string
    disabled?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    min?: string
}

const Input = ({id, label, type, disabled, required, register, errors, min}: Props) => {


  return (
    <div 
        className="w-full relative"
    >
        <input 
            id={id} 
            disabled={disabled}
            {...register(id, { required })}
            placeholder=" "
            type={type}
            min={min}
            className={`
                peer
                w-full
                p-2
                pt-4
                pl-2
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300' }
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black' }
            `}
        />
        <label className={`
            absolute
            text-sm
            duration-150
            transform
            -translate-y-3
            top-3
            z-10
            origin-[0]
            left-2
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `} >
            {label}
        </label>

    </div>
  )
}

export default Input