import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import logo from './logo.png'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import axios from './api'
import Option from './Option'

function ShowProva({items, name, turma, disciplina, handler}){
	const [data,setData] = useState([])
	useEffect(()=>{
		const _items = items.map(it => it[0])
		const _ = async ()=>{
			const result = await axios.post('/api/sel/items/id' , _items)
			const value = _items.map(item=> result.data.filter(a => a.id == item)[0])
			setData(value)
		}
		_()
	},[items])

	const refOptions = useRef()

	return (
		<>	
			
			<div style={{
					display:'flex',
					alignItems:'center',
					justifyContent:'center',
					margin:5,
				}}>
				<img src={logo} width="100" height="100"/>
			</div>
			<div style={{border:'1px solid black', padding:'5px'}}>
			<div>
			<strong>ESCOLA : </strong> <div className="line"></div>
			<strong> ALUNO(A): </strong> <div className="line"></div>
			</div>
			<div>
				<strong> {name} </strong>
			</div>
			<div>
				<strong> TURMA : {turma }</strong>
			</div>
			<div>
				<strong> DISCIPLINA </strong> {disciplina}
			</div>
				
			</div>
			{
				data.map((item,i)=>{
					const options = JSON.parse(item.options)
					return (
					<div className="item" key={i}>
					<div key={item.id} style={
						{
							fontWeight:'bold',
							display:'flex',
							alignItems:'center',
							textAlign:'justify'}
						} >
						<div> 
						<div className="print" style={{cursor:'pointer'}} >
						<HighlightOffIcon onClick={()=> {
							handler({type:'remove', index: i})
						}} /> 
						{ i !== 0 && <ArrowUpwardIcon onClick={()=>{
							handler({type:'up', index:i})
						}}/>}
						 <ArrowDownwardIcon onClick={()=>{
							handler({type:'down', index:i})
						}}/>
						</div>

						{i+1} - {item.head.split('\n').map((v,j)=> (<span key={j}> {v} <br/> </span>) )} </div>
						 
					</div>
						{ items[i] && <Option
							options={options}
							flex={items[i][1]}
							setFlex={(flex)=> handler({type:'change', flex , index: i})} 
						/>}
					</div>
				)
			})
			}
		</>
	)
}

export default ShowProva
