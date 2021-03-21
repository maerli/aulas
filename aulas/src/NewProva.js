import {useRef, useState, useEffect} from 'react'
import List from './List'
import axios from './api'
import Input from '@material-ui/core/Input'
import { useSelector, useDispatch } from 'react-redux'

import ShowProva from './ShowProva'

const _ = async (parentId, setTo)=>{
	const result = await axios.get(`/api/get/directory/parentId/${parentId}`)
	setTo(result.data)
}

function Turmas({data, setDisciplinas, turmaRef}){
	return (
		<select ref={turmaRef} onChange={(evt)=>  _(evt.target.value, setDisciplinas) } >
			{
				data.map(item=>(
					<option key={item.id} value={item.id} > {item.name} </option>
				))
			}
		</select>
	)
}

function Disciplinas({data, setId, disciplinaRef}){
	return (
		<select ref={disciplinaRef} onChange={(evt)=> {
			setId(evt.target.value)
		} } >
			{
				data.map(item=>(
					<option key={item.id} value={item.id}> {item.name} </option>
				))
			}
		</select>
	)
}




function NewProva(){
	const inputRef = useRef()
	const turmaRef = useRef()
	const disciplinaRef = useRef()

	const [turmas,setTurmas] = useState([])
	const [disciplinas, setDisciplinas] = useState([])
	const [id, setId] = useState(null)
	const items = useSelector(state=> state)

	const handleClick  = async ()=>{
		const name = inputRef.current.value
		if(!name){
			return
		}
		const result = await axios.post('/api/add/provas', {
			name,
			items,
			turma: turmaRef.current.selectedOptions[0] .innerText,
			disciplina: disciplinaRef.current.selectedOptions[0] .innerText
		})
	}

	useEffect(()=>{
		_(0, setTurmas)
	},[])
	const dispatch = useDispatch()

	return (
		<>
		<div className="row">
		<div className="col">
			<Container>
				<label> Nome da prova </label>
				<Input inputRef={inputRef} style={{fontWeight:'bold'}}/>
			</Container>

			<Container>
				<label> Turma </label>
				<Turmas data={turmas} setDisciplinas={setDisciplinas} turmaRef={turmaRef}/>
			</Container>
			<Container>
				<label> Disciplina </label>
				<Disciplinas data={disciplinas} setId={setId} disciplinaRef={disciplinaRef}/>
			</Container>
			{
				disciplinas.length != 0 && <List id={id === null ? disciplinas[0].id: id} setId={(getid)=>{
					setId(getid)
				}} buttonValue="Adicionar"  click={(id)=>{
						if(items.indexOf(id) == -1){
						dispatch({type:'add', options: [id, 0]})
					}
				}} />
			}
		</div>
		<div className="prova col" >
				<ShowProva 
					   name={inputRef.current && inputRef.current.value}
					   items={items}
					   turma={
						   	turmaRef.current && 
						   	turmaRef.current.selectedOptions[0] &&
						   	turmaRef.current.selectedOptions[0] .innerText
					   }
					   disciplina={
						   	disciplinaRef.current && 
						   	disciplinaRef.current.selectedOptions[0] &&
						   	disciplinaRef.current.selectedOptions[0].innerText
					   }
					   handler={dispatch}
				/>
				<button className="print" onClick={()=> handleClick() } > Salvar </button>
				<button className="print" onClick={()=> window.print()} > Imprimir </button>
		</div>
	  </div>
	</>
	)
}
export default NewProva

const styles = {
	container:{
		padding:10,
	}
}

function Container({children}){
	return (
		<div style={styles.container} > {children} </div>
	)
}







