import ListIcon from '@material-ui/icons/List'
function Option({options , flex, setFlex}){
	console.log(flex, "flexed")
	return (
		<div className={"options "+(flex?"flex":"")} >
			<div className="print pointer"> <ListIcon onClick={()=> setFlex((flex + 1)%2) } /></div>
			{
				options.map((option, j)=>{
					const index = String.fromCharCode(97 + j)
					return (
						<div
							className="option"
							key={index}
						>
								{index}( ) {option}
						</div>
					)
				})
			}
		</div>
	)
}

export default Option