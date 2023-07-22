import {createContext, useEffect, useReducer} from "react";


const stubs = {
    headers: [
        { // should have ids
            name: "name",
            width: 100,
            type: "name"
        }, {
            name: "description",
            width: 150,
            type: "text"
        },
        {
            name: "number",
            width: 180,
            type: "number"
        },
        {
            name: "tag",
            width: 200,
            type: "select",
            options: ["good", "bad"]
        }
    ],
    rows: [{ id: 1,
        data: {
            id: "hello world",
            number: 10,
            tag: "good"
        }
    }, {
        id: 2,
        data: {
            id: "x2",
            description: "some long description",
            tag: "bad"
        }
    }
    ]


}

type Action = {
    type: "set_database",
    payload: { database: any }
} | {
    type: "set_cell",
    payload: {rowNum: number, name: string, value:any }
}
function databaseReducer(state, action: Action) {
    switch(action.type) {
        case 'set_database':
            return action.payload.database
        case 'set_cell':
            const {rowNum, name, value} = action.payload
            const ret = {
                ...state
            }
            ret[rowNum][name] = value
            return ret

    }
}

export const DatabaseContext = createContext({
    headers: {},
    rows: {},
    setCell: (rowNum: number, name: string, value: any) => {},
    dispatch: (action: Action) => {}
})

export function DatabaseProvider({children}: {children: React.ReactNode}) {
    const [database, dispatch] = useReducer(databaseReducer, {})
    useEffect(() => {
        dispatch({type: "set_database", payload: {database: stubs}})
    }, [dispatch])
    console.log(database)

    const setCell = (rowNum: number, name: string, value:any) => {
        dispatch({type: 'set_cell', payload: {rowNum, name, value}})
    }

    return (<DatabaseContext.Provider
        value={{
            headers: database.headers,
            rows: database.rows,
            setCell,
            dispatch
    }}
    >{children}</DatabaseContext.Provider>)
}
