(function(){

	function Link(child){
		return This.e('div', {
			style:{
				color:'green',
				cursor:'pointer',
				padding:'10px'
			}
		}, [This.e('a',{href:'#/'+child},child)])
	}

	function Menu(){
	
		var home = Link("Home")
		var provas = Link("Provas")

		return This.e('div',{
			style:{
				display:'flex',
				backgroundColor:'blue'
			}
		},[home,provas])
	}
module.exports = Menu
})()

