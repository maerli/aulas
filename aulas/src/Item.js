import {useState, useEffect} from 'react'
import axios from './api'
import DescriptionIcon from '@material-ui/icons/Description'

function Container({item, click, buttonValue, globalhide}){
	const [hide,setHide] = useState(globalhide)

	let options
	try{
		options = JSON.parse(item.options)
	}catch(err){
		console.log(err)
		options = []
	}
	useEffect(()=>{
		setHide(globalhide)
	},[globalhide])

	return (
		<div key={item.id} >
		<div  onClick={()=> setHide(!hide)} style={{display:'flex', alignItems:'center', cursor:'pointer'}}>
			<DescriptionIcon/>
			{item.head}
		</div>
		<div className={hide?'hide':''} >
			{
				options.map((option,i)=>(
					<div key={i}>
						{String.fromCharCode(i + 97)} - {option}
					</div>
				))
			}
			<button onClick={()=>click(item.id)} > {buttonValue} </button>
		</div>
		</div>)
				
}

function Item({parentId, click , buttonValue, globalhide}){
	const [render, setRender] = useState('loading...')
	const [data, setData] = useState([])

	const resolve = (data)=>{
		return (
			data.map(item=>(
				<Container
					key={item.id}
					item={item}
					click={click}
					buttonValue={buttonValue}
					globalhide={globalhide} />
			)
			)
		)
	}

	async function _(){
		const result = await axios.get('/api/get/items/parentId/'+parentId)
		setData(result.data)
		return resolve(result.data)
	}

	useEffect(()=>{
		_().then(value=> setRender(value))
	},[parentId])

	useEffect(()=>{
		setRender(resolve(data))
	},[globalhide])

	return (
		<div>
			{
				render
			}
		</div>
	)
}
export default Item