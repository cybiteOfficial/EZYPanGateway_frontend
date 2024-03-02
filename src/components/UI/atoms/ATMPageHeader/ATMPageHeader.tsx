import  Breadcrumbs  from '@mui/material/Breadcrumbs'
import React from 'react'
import { twMerge } from 'tailwind-merge';

type BreadcrumbsList = {
    label: string;
    onClick?: () => void
}

type Props = {
    pageTitle: string;
    breadcrumbsList: BreadcrumbsList[]
}

const ATMPageHeader = ({
    pageTitle,
    breadcrumbsList,
}: Props
) => {
    return (
        <div className='h-[70px] ' >

            <div className='text-xl text-slate-700 font-bold ' >
                {pageTitle}
            </div>

            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    {
                        breadcrumbsList?.map((listItem: BreadcrumbsList, listItemIndex) => {
                            const { label, onClick } = listItem

                            return (
                                <div
                                    key={listItemIndex}
                                    className={twMerge(`text-sm ${listItemIndex === (breadcrumbsList.length - 1) ? "text-primary-main" : "hover:border-b border-slate-400 cursor-pointer"}`)}
                                    onClick={() => { listItemIndex !== (breadcrumbsList.length - 1) && onClick && onClick() }}
                                >
                                    {label}
                                </div>

                            )
                        })
                    }

                </Breadcrumbs>
            </div >
        </div >
    )
}

export default ATMPageHeader
