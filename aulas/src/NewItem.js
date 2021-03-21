import React,{useState,useRef, createContext, useContext} from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import axios from './api'

const Context = createContext()

const NewOption = ({index})=>{

	const ref = useRef()

	const g = useContext(Context)
	g.push(ref)

	return (
		<div> {String.fromCharCode(97 + index)} <TextareaAutosize ref={ref} /> </div>
	)
}


function NewItem(props){
	const headRef = useRef()
	const refs = []
	const [options,setOptions] = useState([0])

	async function addItem(){
		const result = await axios.post('/api/add/items' ,
			{
				head: headRef.current.value,
				options: JSON.stringify(refs.map(ref=> ref.current.value)) ,
				correct:'0',
				parentId: props.match.params.id
			})
		console.log(result.data)
	}

	function handleClick(){
		setOptions([...options, options.length])
	}

	return (
		<Context.Provider value={refs} >
			<TextareaAutosize
				placeholder="item"
				ref={headRef}
				rows="4"
				style={
					{
						padding:4,
						width:'50%'
					}
				}
				/>
			<div>
				
				{options.map((i)=>(
					<NewOption key={i} index={i} / >
				))}
				<button onClick={handleClick} > + option </button>
				<button onClick={addItem} > Criar item </button>
			</div>
		</Context.Provider>
	)
}
export default  NewItem