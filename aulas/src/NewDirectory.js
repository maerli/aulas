import React,{useRef, useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from './api'
import List from './List'

function NewDirectory(){
    const refText = useRef()
    const [id,setId] = useState(0)
    const [newDirectory,setNewDirectory] = useState(null)

    async function handleClick(){
        const name = refText.current.value
        const result = await axios.post('api/add/directory', {name, parentId: id, type:'$'})
        setNewDirectory(name)
    }
    return (
        <div>
            <TextField inputRef={refText}/>
            <Button onClick={handleClick}> Criar </Button>
            <List id={id} setId={setId} newDirectory={newDirectory} action={{button:"Editar", click:()=>alert(1)}}/>
        </div>
    )
}
export default NewDirectory