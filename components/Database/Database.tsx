import {ChevronDownIcon, EllipsisHorizontalIcon, PlusIcon} from "@heroicons/react/20/solid";


function DatabaseTitle({title}: {title: string}) {
    return <div className="flex gap-2">
        <h2 className="font-medium text-xl">{title}</h2>
        <button className="self-center text-gray-500 hover:bg-gray-200 p-1 rounded"><EllipsisHorizontalIcon className="h-4 w-4"/></button>
    </div>
}

const widths = [200, 200, 200, 100]

function CheckBox() {
    return <div className="flex items-center w-[20px]">
        <input className="mx-1 opacity-0 checked:opacity-100 hover:opacity-100 duration-200 ease-in-out" type="checkbox" />
    </div>
}

function DatabaseHeader() {
    const headers = [{name: "Name"}, {name: "Type"}, {name: "Number"}]
    return (<div className="flex text-sm text-gray-500">
        {headers.map(({name}, i) =>
            <div className={`flex flex-0`} key={i}>
                {i === 0 && <CheckBox />}
                <div className={`hover:bg-gray-200 px-2 py-1`} style={{width: `${widths[i]}px`}}>{name}</div>
            </div>)}
        <div className="flex" style={{width: `${widths.at(-1)}px`}}>
            <button className="flex-0 p-1 hover:bg-gray-200"><PlusIcon className="h-5 w-5"/></button>
            <button className="flex-1 p-1 hover:bg-gray-200"><EllipsisHorizontalIcon className="h-5 w-5"/></button>
        </div>
    </div>)
}

function DatabaseCells() {
    const rows = [{cells: ["", "", ""], id: "1"},
        {cells: ["", "sdsad", ""], id: "2"}, {cells: ["", "some text", ""], id: "3"}, {cells: ["", "", "hello world"], id:"4"}]
    return (<div className="text-sm text-gray-800">
        {rows.map(row => <div key={row.id} className="h-8 flex border-b-[1px] first:border-t-[1px] border-gray-200">{
                row.cells.map((value, i) =>
                    <div className={`flex flex-0 items-center`} key={i}>
                        {i === 0 && <CheckBox />}
                        <div className={`flex px-2 py-1 h-full border-r-[1px] border-gray-200`} style={{width: `${widths[i]}px`}}> {value}</div>
                    </div>)
            }</div>)
        }
        </div>
    )
}

function DatabaseTable() {

    return (
        <div style={{width: `${widths.reduce((a, b) => a + b, 20)}px`}}>
            <DatabaseHeader />
            <DatabaseCells />
            <DatabaseFooter/>

        </div>
    )
}

function DatabaseFooter() {
    return (
        <div className="flex flex-col text-gray-500 text-sm ">
            <button className="flex gap-1 items-center p-1 hover:bg-gray-200 w-full">
                <PlusIcon className="h-5 w-5"/>
                New
            </button>
            <div className="border-t-[1px] border-gray-200 flex">
                {widths.map((width, i) =>
                    <div key={i} className={`flex-0`} style={{width: `${widths[i]}px`}}>
                        <button className="w-full flex justify-end items-center hover:bg-gray-200 p-1">Calculate <ChevronDownIcon className="h-4 w-4"/></button>
                </div>)}
            </div>
        </div>
    )
}

export function Database() {


    return (
        <div className="space-y-2">
            <DatabaseTitle title="Hello world" />
            <DatabaseTable/>

        </div>

    )
}