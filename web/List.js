(function(){
	
	function List(){
		const [data,setData] = This.useState([])

		async function _(id){
				const req = await axios.get('http://localhost:5000/api/get/directory/parentId/'+id)
				//console.log(req.data)
				setData(req.data)
			}

		This.useEffect(()=>{
			_(0)
		},[])

		return This.e('div', null, data.map(dir=>{
			return This.e('div', {onClick:()=>{ 
				_(dir.id)
			}}, dir.name)
		}))
	}
	module.exports = List
})()