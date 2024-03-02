import React, { ChangeEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { MdArrowDropDown } from 'react-icons/md'
import { BiSearchAlt2 } from 'react-icons/bi';
import  ClickAwayListener from '@mui/material/ClickAwayListener';

type Props = {
    value: any[];
    onSelect: (newValue: any) => void;
    options: any[],
    filterOptions?: any[],
    renderOption?: (option: any) => string | React.ReactNode,
    renderInputValue?: (option: any) => string | React.ReactNode
    label?: string;
    required?: boolean;
    placeholder?: string;
    extraClasses?: string;
    noOptionText?: string;
    isSearchBox?: boolean;
    searchValue?: string;
    onSearchChange?: (e: ChangeEvent<HTMLInputElement>, newValue: string) => void;
    isOptionEqualToValue?: (option: any, value: any) => boolean
}

const ATMMultiSelect = ({
    value,
    onSelect,
    required = false,
    isSearchBox,
    searchValue,
    onSearchChange,
    label,
    noOptionText = "No Option",
    extraClasses = '',
    options,
    filterOptions,
    placeholder,
    renderOption,
    renderInputValue,
    isOptionEqualToValue,
}: Props
) => {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    return (
        <div>
            {
                label ?
                    <label className='text-slate-700 mb-1 block ' > {label}  {required && <span className='text-red-400' > * </span>} </label>
                    :
                    null
            }

            <div className='relative w-full' >

                <div onClick={() => setIsOptionsOpen(prev => !prev)} className={twMerge(`cursor-pointer w-full border h-[35px] rounded flex px-2 items-center text-slate-500 ${extraClasses} `)}>
                    <div className='h-full w-full flex items-center overflow-x-auto gap-2' >
                        {
                            value?.map((ele, index) => <div key={index} className='px-2 h-[25px] bg-slate-200 flex gap-2 items-center rounded-full text-sm'> {renderInputValue ? (renderInputValue(options.find(option => (isOptionEqualToValue ? isOptionEqualToValue(option, ele) : ele === option)))) : ele} <span className='bg-white w-[15px] flex justify-center rounded-full' > X </span> </div>)
                            ||
                            placeholder
                        }

                    </div>

                    <div className='h-full flex items-center' >
                        <MdArrowDropDown className='text-2xl ' />
                    </div>
                </div>

                {
                    isOptionsOpen &&
                    <ClickAwayListener
                        onClickAway={() => setIsOptionsOpen(false)}
                    >

                        <div className='absolute w-full shadow-lg rounded  animate-[fade_0.3s_ease-in-out] py-2' >

                            {/* Search Box */}
                            {
                                isSearchBox ?
                                    <div className='px-2 mb-2 ' >
                                        <div className='w-full  border border-slate-400 h-[35px] text-slate-400 rounded flex justify-between items-center px-2' >
                                            <input
                                                value={searchValue}
                                                onChange={(e) => onSearchChange && onSearchChange(e, e.target.value)}
                                                className='border-0  w-full rounded outline-0 h-full'
                                                placeholder='Search' />
                                            <BiSearchAlt2 className='text-xl' />
                                        </div>
                                    </div>
                                    : null
                            }

                            {
                                filterOptions?.length ?
                                    filterOptions?.map((option, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => onSelect(value?.findIndex((ele) => isOptionEqualToValue ? (isOptionEqualToValue(option, ele)) : (ele === option)) !== -1 ? (value.filter((ele) => isOptionEqualToValue ? (!isOptionEqualToValue(option, ele)) : (ele !== option))) : ([...value, option]))}
                                                className={`flex gap-3 items-center  py-2 hover:bg-slate-100 px-2 cursor-pointer `}
                                            >
                                                <input
                                                    type='checkbox'
                                                    checked={value?.findIndex((ele) => isOptionEqualToValue ? (isOptionEqualToValue(option, ele)) : (ele === option)) !== -1}
                                                    onChange={() => onSelect(value?.findIndex((ele) => isOptionEqualToValue ? (isOptionEqualToValue(option, ele)) : (ele === option)) !== -1 ? (value.filter((ele) => isOptionEqualToValue ? (!isOptionEqualToValue(option, ele)) : (ele !== option))) : ([...value, option]))}
                                                    className=' w-[15px] h-[15px] ' />
                                                {renderOption ? renderOption(option) : option}
                                            </div>
                                        )
                                    })
                                    :

                                    <div className='flex justify-center text-slate-400' >
                                        {noOptionText || 'No options !'}
                                    </div>
                            }
                        </div>
                    </ClickAwayListener>
                }
            </div>

        </div >
    )
}

export default ATMMultiSelect
