export type TextFieldType = {
    name: string;
    label: string;
    placeholder: string;
    type?: "text";
    optionAccessKey?: never;
    offset?: number
  };
  
 export type SelectFieldType<OptionAccessKey> = {
    name: string;
    label: string;
    placeholder: string;
    type?: "select";
    optionAccessKey: OptionAccessKey;
    offset?: number

  };

  export type FilePickerFieldType = {
    name: string;
    label: string;
    placeholder: string;
    type?: "file-picker";
    optionAccessKey?: never;
    offset?: number
  };

  
export type Field<OptionAccessKey> = TextFieldType | SelectFieldType<OptionAccessKey> | FilePickerFieldType ;

export type SelectOption= {
  label: string,
  value: string | number
}