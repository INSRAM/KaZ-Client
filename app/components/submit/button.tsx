'use client'

import { useFormStatus } from 'react-dom'

interface Button_ {
    text: string
}

export const SubmitButton: React.FC<Button_> = ({ text }) => {
    const { pending } = useFormStatus()
    return <button type="submit" disabled={pending} className="w-full bg-blue-500 text-white p-2 rounded">
        {pending ? 'Loading...' : text}
    </button>
}