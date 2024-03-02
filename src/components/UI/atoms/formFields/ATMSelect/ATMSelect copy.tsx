import React, { ChangeEvent, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { MdArrowDropDown } from 'react-icons/md'
import  ClickAwayListener  from '@mui/material/ClickAwayListener';

type Props = {
    value: any;
    renderValue: (value: any) => string | number | React.ReactNode
    onSelect: (newValue: any) => void;
    options: { label: string | ReactNode, value: any }[],
    label?: string;
    required?: boolean;
    placeholder?: string;
    extraClasses?: string;
    noOptionText?: string;
    isSearchBox?: false;
    searchValue?: string;
    onSearchChange?: (e: ChangeEvent<HTMLInputElement>, newValue: string) => void;
    maxHeight?: string;
}

const ATMSelect = ({
    value,
    renderValue,
    onSelect,
    required = false,
    isSearchBox,
    searchValue,
    onSearchChange,
    label,
    noOptionText = "No Option",
    extraClasses = '',
    options,
    placeholder,
    maxHeight
}: Props
) => {

    const [toggleOpenSelect, setToggleOpenSelect] = useState(false);
    return (
        <div >
            {
                label ?
                    <label className='text-slate-700 mb-1 block ' > {label}  {required && <span className='text-red-400' > * </span>} </label>
                    :
                    null
            }

            <div className='relative' >

                {
                    toggleOpenSelect &&
                    <ClickAwayListener
                        onClickAway={() => setToggleOpenSelect(false)}
                    >

                        <div className='shadow absolute w-full  text-slate-600 pt-1 rounded bg-white max-h-[80px] overflow-auto bottom-0' >
                            <ul className='h-full' >
                                {
                                    options.map((option, optionIndex) => {
                                        return (
                                            <li key={optionIndex} onClick={() => { onSelect(option); setToggleOpenSelect(false) }} className={twMerge(`py-1 px-2 cursor-pointer hover:bg-slate-100 ${value === option && "bg-slate-100"}`)} >
                                                {
                                                    option.label
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                    </ClickAwayListener>
                }

                <button onClick={(e) => {setToggleOpenSelect(prev => !prev) }} className={twMerge(`w-full h-[35px] px-2 border text-slate-600 rounded flex items-center bg-white`)} >
                    {
                        renderValue(value)
                    }
                    <span className='absolute right-2' >
                        <MdArrowDropDown className='text-2xl text-slate-600' />
                    </span>
                </button>

                {
                    toggleOpenSelect &&
                    <ClickAwayListener
                        onClickAway={() => setToggleOpenSelect(false)}
                    >

                        <div className='shadow absolute w-full  text-slate-600 pt-1 rounded bg-white max-h-[80px] overflow-auto' >
                            <ul className='h-full' >
                                {
                                    options.map((option, optionIndex) => {
                                        return (
                                            <li key={optionIndex} onClick={() => { onSelect(option); setToggleOpenSelect(false) }} className={twMerge(`py-1 px-2 cursor-pointer hover:bg-slate-100 ${value === option && "bg-slate-100"}`)} >
                                                {
                                                    option.label
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                    </ClickAwayListener>
                }

            </div>
        </div >
    )
}

export default ATMSelect
