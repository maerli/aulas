import {createContext,useContext} from 'react'

const MyContext = createContext({id:0, setId:null})
function Context({value,children}){
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

function useList(){
    const [id, setId] = useContext(MyContext)
    return [id,setId]
}

export {Context,useList}