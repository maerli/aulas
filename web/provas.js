(async function(){

	function Provas(){

		const [data, setData] = This.useState([])
		const [count,setCount] = This.useState(0)
		const refInput = This.useRef()

		async function load(){
			const req = await axios.get('http://localhost:5000/api/get/provas')
			setData(req.data)
		}
		This.useEffect(()=>{
			load()
		},[])

		var div = This.e('div', null, data.length === 0 ? [e('div',null, 'Carregando...')] : This.Fragment(data.map(prova=>This.e('div',null,prova.name))))
		var button = This.e('button', {
			onClick:()=> alert(refInput.current.value)
		}, 'contar')
		var input = This.e('input', {
			type:'text',
			ref:refInput
		})
		return This.e('div', null, [This.e('div', null, count+''), button,input, div])
	}
module.exports = Provas
})()
