export const indianPhoneRegex =  RegExp(/^(\+91|0)?[6-9]\d{9}$/);
export const handleValidNumber = (event : any) =>{
    const PinRegExp = /^[0-9]*$/
    if (PinRegExp.test(event?.target?.value)) {
        return true
    }
    else {
        return false

    }
} 
