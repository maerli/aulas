import axios from './api'

async function deleteAll(){
	const result = await axios.post('/api/del/items')
	console.log(result.data)
}

function Delete(){
	return (
		<div>
			<button onClick={deleteAll} > Apagar tudo </button>
		</div>
	)
}
export default Delete