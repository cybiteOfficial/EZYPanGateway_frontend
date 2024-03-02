import React, { ChangeEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { MdArrowDropDown } from 'react-icons/md'
import { BiSearchAlt2 } from 'react-icons/bi';
import ClickAwayListener from '@mui/material/ClickAwayListener';

type Props = {
    value: any[];
    onSelect: (newValue: any) => void;
    options: any[],
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
    isOptionEqualToValue?: (option: any, value: any) => boolean;
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
    placeholder,
    renderOption,
    renderInputValue,
    isOptionEqualToValue,
}: Props
) => {

    const [toggleOpenSelect, setToggleOpenSelect] = useState(false);

    const removeTag = (index: any) => {
        const newTagArray = value;
        newTagArray.splice(index, 1);
        onSelect([...newTagArray]);
    };

    return (
        <div>
            {
                label ?
                    <label className='text-slate-700 mb-1 block ' > {label}  {required && <span className='text-red-400' > * </span>} </label>
                    :
                    null
            }

            <div className={twMerge(`relative border border border-slate-400 h-[35px] rounded  ${extraClasses}`)} >
                <div
                    onClick={() => setToggleOpenSelect(prev => !prev)}
                    className='bg-transparent rounded h-full w-full flex items-center justify-between  px-2 text-slate-600'
                >
                    <div className='overflow-x-scroll  h-full items-center flex gap-2' >

                        {value?.length ?
                            (
                                value?.map((tag, index) => (
                                    <React.Fragment key={index} >
                                        <>
                                            {

                                                <div className='flex gap-3 items-center rounded-full  bg-slate-200 p-1 px-2 text-sm h-[25px]'>
                                                    <div>
                                                        {renderInputValue ? renderInputValue(options?.find((option) => isOptionEqualToValue ? isOptionEqualToValue(option, tag) : option === tag)) : options?.find((option) => isOptionEqualToValue ? isOptionEqualToValue(option, tag) : option === tag)}
                                                    </div>
                                                    <div
                                                        onClick={(e) => { e.stopPropagation(); removeTag(index) }}
                                                        className={`cursor-pointer h-[20px] w-[20px] flex justify-center items-center rounded-full bg-slate-100`}
                                                    >
                                                        x
                                                    </div>
                                                </div >
                                            }

                                        </>
                                    </React.Fragment>
                                ))

                            )
                            :
                            (placeholder)
                        }
                    </div>

                    <div>
                        <MdArrowDropDown className='text-2xl justify-self-end' />
                    </div>
                </div>

                {
                    toggleOpenSelect ?
                        (
                            <ClickAwayListener
                                onClickAway={() => setToggleOpenSelect(false)}
                            >

                                <div className='absolute shadow-md w-full py-2 rounded m-0 animate-[fade_0.4s_ease-in-out]' >

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
                                        options.length ?

                                            // Options
                                            (
                                                options.map((option, index) => {

                                                    return (
                                                        <div key={index} onClick={() => { (value?.findIndex((ele, index) => (isOptionEqualToValue ? isOptionEqualToValue(option, ele) : ele === option)) !== -1) ? onSelect(value?.filter(ele => ele !== option)) : onSelect([...value, option]) }} className='cursor-pointer hover:bg-slate-100 px-2 py-2 flex gap-3 items-center' >

                                                            <input
                                                                type='checkbox'
                                                                className='h-[17px] w-[17px]'
                                                                checked={(value?.findIndex((ele, index) => (isOptionEqualToValue ? isOptionEqualToValue(option, ele) : ele === option)) !== -1)}
                                                                onChange={() => {
                                                                }}
                                                            />

                                                            <div >

                                                                {
                                                                    renderOption ? renderOption(option) : option
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })



                                            )
                                            :

                                            // No Option Text
                                            (
                                                <div className='text-center text-slate-400' >
                                                    {noOptionText}
                                                </div>
                                            )
                                    }
                                </div>
                            </ClickAwayListener>
                        )
                        :
                        null
                }

            </div>
        </div >
    )
}

export default ATMMultiSelect
