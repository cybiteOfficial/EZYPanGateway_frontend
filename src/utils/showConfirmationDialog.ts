import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2' 

type Props = { 
    DeclarationFormUrl?:string;
    title: string;
    text: string;
    icon?: SweetAlertIcon;
    showCancelButton?: boolean;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    confirmButtonText?: string;
    next?: (result: SweetAlertResult<any>) => void;

}

export const showConfirmationDialog = ({
    title,
    text,
    icon = 'warning',
    showCancelButton = false,
    confirmButtonColor = '#3085d6',
    cancelButtonColor = '#d33',
    confirmButtonText = "Yes",
    next = () => { }

}: Props
) => {
    return ( 
        Swal.fire({
            title,
            text,
            icon,
            showCancelButton,
            confirmButtonColor,
            cancelButtonColor,
            confirmButtonText,
        }).then(next) 
        
    )
}