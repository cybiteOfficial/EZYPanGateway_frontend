import Swal, { SweetAlertIcon, SweetAlertResult, SweetAlertOptions } from 'sweetalert2';

type Props = {
    title: string;
    text: string;
    icon?: SweetAlertIcon;
    showCancelButton?: boolean;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    confirmButtonText?: string;
    next?: (result: SweetAlertResult<any>) => void;
    field1Name?: string;
    field1Value?: string;
    field2Name?: string;
    field2Value?: string;
};

type CustomSweetAlertOptions = SweetAlertOptions & {
    input2?: 'text' | 'email' | 'password' | 'textarea' | 'file' | 'range' | 'select' | 'radio' | 'checkbox' | 'url' | 'tel' | 'number' | 'search' | 'color';
    inputPlaceholder2?: string;
    inputValue2?: string;
    inputAttributes2?: Record<string, unknown>;
};

export const updateConfirmationDialog = ({
    title,
    text,
    icon = 'warning',
    showCancelButton = false,
    confirmButtonColor = '#3085d6',
    cancelButtonColor = '#d33',
    confirmButtonText = 'Yes',
    next = () => { },
    field1Name = '',
    field1Value = '',
    field2Name = '',
    field2Value = '',
}: Props) => {
    const options: CustomSweetAlertOptions = {
        title,
        text,
        icon,
        showCancelButton,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        input: 'text',
        inputPlaceholder: field1Name,
        inputValue: field1Value,
        inputAttributes: {
            autocapitalize: 'off',
        },
        input2: 'text',
        inputPlaceholder2: field2Name,
        inputValue2: field2Value,
        inputAttributes2: {
            autocapitalize: 'off',
        },
    };
    
    return Swal.fire(options).then(next);
};
