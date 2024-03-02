import {BsFillChatLeftDotsFill} from 'react-icons/bs'

export const orderStatusKey = {
    HOLD: {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-500",
        label: "On Hold"
    },
    DELIVERED: {
        bgColor: "bg-green-100",
        textColor: "text-green-500",
        label: "Delivered"
    }
}

export const renderorderStatus = (status: 'HOLD' | 'DELIVERED') => {

    const { bgColor, textColor, label } = orderStatusKey[status]

    return (
        <span
            className={`px-3 py-1 rounded-full text-[12px] inline-flex gap-2 items-center  ${bgColor} ${textColor}`}
        >
            <BsFillChatLeftDotsFill className=' text-[17px] ' />
            {label}
        </span>
    )
} 