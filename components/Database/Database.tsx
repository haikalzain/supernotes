'use client'
import {ChevronDownIcon, EllipsisHorizontalIcon, PlusIcon} from "@heroicons/react/20/solid";
import {DatabaseContext, DatabaseProvider} from "@/components/Database/context";
import React, {useContext, useEffect, useRef, useState} from "react";

const lastColWidth = 100

function DatabaseTitle({title}: { title: string }) {
    return <div className="flex gap-2">
        <h2 className="font-medium text-xl">{title}</h2>
        <button className="self-center text-gray-500 hover:bg-gray-200 p-1 rounded"><EllipsisHorizontalIcon
            className="h-4 w-4"/></button>
    </div>
}

function CheckBox() {
    return <div className="flex items-center w-[20px]">
        <input className="mx-1 opacity-0 checked:opacity-100 hover:opacity-100 duration-200 ease-in-out"
               type="checkbox"/>
    </div>
}

function DatabaseHeader() {
    const {headers} = useContext(DatabaseContext)


    return (<div className="flex text-sm text-gray-500">
        {headers && headers.map(({name, width}, i) =>
            <div className={`flex flex-0`} key={i}>
                {i === 0 && <CheckBox/>}
                <div className={`hover:bg-gray-200 px-2 py-1`} style={{width: `${width}px`}}>{name}</div>
            </div>)}
        <div className="flex" style={{width: `${lastColWidth}px`}}>
            <button className="flex-0 p-1 hover:bg-gray-200"><PlusIcon className="h-5 w-5"/></button>
            <button className="flex-1 p-1 hover:bg-gray-200"><EllipsisHorizontalIcon className="h-5 w-5"/></button>
        </div>
    </div>)
}

function DatabaseCells() {
    const {headers, rows, setCell} = useContext(DatabaseContext)
    return (<div className="text-sm text-gray-800">
            {rows && rows.map((row, i) => <div key={i}
                                               className="h-8 flex border-b-[1px] first:border-t-[1px] border-gray-200">{
                headers.map(header =>
                    <DatabaseCell
                        key={header.name}
                        type={header.type}
                        value={row.data[header.name]}
                        setCell={(v) => setCell(i, header.name, v)}
                        width={header.width}
                    />)
            }</div>)
            }
        </div>
    )
}

function DatabaseCell({type, value, setCell, width}) {
    const [active, setActive] = useState(false)
    return (
        <div className={`relative flex flex-0 items-center`} onClick={() => setActive(true)}>
            {type === 'name' && <CheckBox/>}
            <div className={`flex px-2 py-1 h-full border-r-[1px] border-gray-200 whitespace-nowrap overflow-hidden`}
                 onBlur={() => setActive(false)} style={{width: `${width}px`}}> {value}</div>
            {active && <CellDialog type={type} value={value} setCell={setCell} width={width} setActive={setActive}/>}
        </div>)
}

function CellDialog({type, value, setCell, width, setActive}) {
    const ref = useRef(null)
    useEffect(() => {
        ref?.current?.focus()
    }, [ref])

    return (<input value={value ?? ""}
                   onChange={(e) => setCell(e.target.value)}
                   type="text" ref={ref}
                   className="px-2 py-1 outline-none border-none rounded z-10 absolute left-0 top-0 bg-white h-full shadow "
                   style={{width: `${width + 20}px`}}
                   onBlur={() => setActive(false)}/>)
}

function DatabaseTable() {
    const {headers} = useContext(DatabaseContext)
    const widths = headers ? headers.map(h => h.width) : []
    return (
        <div className="cursor-pointer" style={{width: `${widths.reduce((a, b) => a + b, 20 + lastColWidth)}px`}}>
            <DatabaseHeader/>
            <DatabaseCells/>
            <DatabaseFooter/>

        </div>
    )
}

function DatabaseFooter() {
    const {headers, rows, addRowAfter} = useContext(DatabaseContext)
    const widths = headers ? headers.map(h => h.width) : []
    const addRow = () => {
        addRowAfter(rows.length - 1)
    }
    return (
        <div className="flex flex-col text-gray-500 text-sm ">
            <button onClick={addRow} className="flex gap-1 items-center p-1 hover:bg-gray-200 w-full">
                <PlusIcon className="h-5 w-5"/>
                New
            </button>
            <div className="border-t-[1px] border-gray-200 flex">
                {widths.map((width, i) =>
                    <div key={i} className={`flex-0`} style={{width: `${widths[i]}px`}}>
                        <button
                            className="w-full flex justify-end items-center hover:bg-gray-200 p-1">Calculate <ChevronDownIcon
                            className="h-4 w-4"/></button>
                    </div>)}
            </div>
        </div>
    )
}

export function Database() {


    return (
        <DatabaseProvider>
            <div className="space-y-2">
                <DatabaseTitle title="Hello world"/>
                <DatabaseTable/>
            </div>
        </DatabaseProvider>

    )
}