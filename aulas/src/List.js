import {useEffect, useState} from 'react'
import axios from './api'
import {useList} from './Context'
import {Link} from 'react-router-dom'
import Items from './Item'
import FolderIcon from '@material-ui/icons/Folder'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'


const styles = {
	text:{
		fontSize:19,
		fontWeight:'bold',
		textTransform:'capitalize',
		cursor:'pointer',
		borderColor:'black',
		color:'brown',
		display:'flex',
		alignItems:'center'
	}
}

function NewItem({parentId}){
	return (
		<div>
			<Link to={"/new/item/"+parentId} > Novo item </Link>
		</div>
	)
}
let history =[]
function List({id,setId, newDirectory, buttonValue, click}){
	//const [id,setId] = useList(

	const [data,setData] = useState([])
	const [isoptions,setIsoptions] = useState(false)
	
		
	async function _(_id){
	    const req1 = await axios.get('/api/get/directory/parentId/'+_id)
	    setData(req1.data)
	}

	useEffect(()=>{
		_(id)
	}, [id,newDirectory])
	useEffect(()=>{
		history = [id]
	},[])

	const handleClick = ()=>{
		console.log(history)
	 	if(history.length !== 1){
	 		history.shift()
	 		setId(history[0])
	 	}
	}

	return (
		<div>
			 <button onClick={handleClick} > <ArrowBackIcon/> </button>

			Mostrar opções : <input type="checkbox"  onChange={(evt)=>{
				setIsoptions(evt.target.checked)
			}} />
			<div>
				{ id === 0 ? "Turmas":""}
			</div>

			{   data.length === 0 ? <NewItem parentId={id}/> :   
				data.map(item=>(
					<div key={item.id} onClick={()=>{
						setId(item.id)
						history.unshift(item.id)
					}} style={styles.text} >
					<FolderIcon/>
					{item.name}
				</div>))
			}
			<div className="items--container">
			{
				<Items
					parentId={id}
					buttonValue={buttonValue}
					click={click}
					globalhide={!isoptions} />
			}
			</div>
		</div>

	)
}
export default List