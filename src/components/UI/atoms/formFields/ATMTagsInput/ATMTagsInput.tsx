import React, { useState } from 'react'
import { getInputHeight } from 'src/utils/formUtils/getInputHeight';

export interface ATMTagsInputPropTypes {
    tags: any[]
    setTags: ((value: any[]) => void);
    max?: number;
    renderTag?: (tag: any, removeTag: any) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    size?: 'small' | 'medium' | 'large';

}

const ATMTagsInput = ({
    tags,
    setTags,
    max = Infinity,
    renderTag,
    label,
    required = false,
    disabled = false,
    readonly = false,
    size ='small',
}: ATMTagsInputPropTypes
) => {

    const [currentTagText, setCurrentTagText] = useState("");

    const handleTag = (e: any) => {
        if (tags.length < max) {
            setCurrentTagText(e.target.value);
        }
        if (e.keyCode === 13 && currentTagText.trim() && tags.length < max) {
            setTags([...tags, currentTagText]);
            setCurrentTagText("");
        }
        else if (e.keyCode === 32 && currentTagText.trim() && tags.length < max) {
            setTags([...tags, currentTagText]);
            setCurrentTagText("");
        }
    };
    const removeTag = (index: any) => {
        const newTagArray = tags;
        newTagArray.splice(index, 1);
        setTags([...newTagArray]);
    };


    return (
        <>
            {
                label &&
                <label className='text-slate-500' > {label} {required && <span className='text-red-500'> * </span>} </label>
            }
            <div className={`${getInputHeight(size)} flex gap-2 border border-slate-400 rounded p-1 overflow-auto w-full ${label && 'mt-1'} ${disabled && 'opacity-60'} `} >
                {
                    tags.map((tag, index) => (
                        <React.Fragment key={index} >
                            <>
                                {

                                    renderTag ? renderTag(tag, () => { !disabled && !readonly && removeTag(index) })
                                        :
                                        <div className='flex gap-3 items-center rounded-full bg-slate-300 p-1 px-2 text-sm h-[25px]'>
                                            <div>
                                                {tag}
                                            </div>
                                            <div
                                                onClick={() => !disabled && !readonly && removeTag(index)}
                                                className={`${!disabled && !readonly && 'cursor-pointer'} h-[20px] w-[20px] flex justify-center items-center rounded-full bg-slate-100`}
                                            >
                                                x
                                            </div>
                                        </div >
                                }

                            </>
                        </React.Fragment>
                    ))
                }

                {
                    !disabled && !readonly &&
                    <div className='flex flex-auto ' >
                        <input
                            className='border-none outline-0zz '
                            onKeyDown={handleTag}
                            onChange={handleTag}
                            value={currentTagText}
                            readOnly={readonly}
                            disabled={disabled}
                        />
                    </div>
                }
            </div >
        </>


    )
}

export default ATMTagsInput
