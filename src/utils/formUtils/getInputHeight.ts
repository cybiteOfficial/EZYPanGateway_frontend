export type Size = "small" | "medium" | "large"|number
export const getInputHeight =  (size: Size , inNumber?: boolean )=> {
   if(typeof size === "number"){
return inNumber ? size :`h-[${size}px]`
   }else{
    switch (size) {
        case 'small':
            return inNumber ? 40 : 'h-[40px]';
        case 'medium':
            return inNumber ? 55 : 'h-[55px]';
        case 'large':
            return inNumber ? 70 : 'h-[70px]';
        default:
            return inNumber ? 40 : 'h-[40px]';
    }
   }
}