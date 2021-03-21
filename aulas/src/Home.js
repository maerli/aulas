import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import List from './List'

function Home(){

    const [id,setId] = useState(0)

    return (
        <div>
            <List
            	id={id}
            	setId={setId}
            	buttonValue="Editar"
            	click={()=>alert(1)}
            />
        </div>
    )
}
export default Home
