import {useState, useEffect} from 'react'
import axios from './api'
import {Link} from 'react-router-dom'

function Show(){
	const [data, setData] = useState([])
	useEffect(()=>{
		const _ = async()=>{
			const result = await axios.get('/api/get/provas')
			setData(result.data)
		}
		_()
	}, [])

	console.log(data)
    return (
        <div>
            {
	
            	data.map((prova, i) => {
            		return (<div key={i}>
						<Link to={
							{
								pathname:`/provas/${prova.id}`,
								items: JSON.parse( prova.items ),
								name: prova.name,
								turma: prova.turma,
								disciplina: prova.disciplina
							}
						} > {prova.name} </Link>
					</div>
            	)})
			}
			
        </div>
    )
}

export default Show