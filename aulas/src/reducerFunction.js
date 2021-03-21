
function reducer(state = [], action){
	switch(action.type){
		case 'add':
			return [...state, action.options]
			break
		case 'remove':
			state.splice(action.index, 1)
			return [...state]
			break
		case 'up':
			if(action.index !== 0){
				state.splice(action.index - 1,2, state[action.index], state[action.index-1])
				return [...state]
				
			}else{
				return state
			}
			break
		case 'down':
			if(action.index < (state.length - 1)){
				state.splice(action.index,2, state[action.index + 1], state[action.index])
				console.log(state, 'down')
				return [...state]
			}else{
				return state
			}
			break
		case 'change':
			const flex = action.flex
			state.splice(action.index,1, [state[action.index][0], flex])
			return [...state]
		default:
			return state
	}
}
export default reducer