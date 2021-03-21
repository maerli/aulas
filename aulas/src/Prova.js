import {useEffect, useState} from 'react'
import axios from './api'
import { Link, useLocation} from 'react-router-dom'
import ShowProva from './ShowProva'
import reducer from './reducerFunction'


function Provas(props){
	let location = useLocation()
	let [items, setItems] = useState(location.items)

	
	return (<div style={{padding:10, width:'50vw'}}>
		<ShowProva
			items={items}
			name={location.name}
			turma={location.turma}
			disciplina={location.disciplina}
			handler={(action)=>{
				setItems(reducer(items, action))
			}}
		/>
	</div>)
}
export default Provas