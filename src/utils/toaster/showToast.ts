import { toast } from "react-hot-toast"

type ToastType = "success" | "error"

export const showToast = (type:ToastType , message:string  )=> {
    toast[type](message , {
        duration: 3000,
        position: "top-center",
        className:'text-[30px] ',
        style: {
            minWidth:'50vh',
            maxWidth:'80vh'
        }

    })
}