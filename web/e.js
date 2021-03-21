const This = (function(){

function e(name,options,childrens){
	return {
		name, options, childrens, elm: null
		}
	}

function Fragment(childrens){
	return e('fragment',null, childrens);
}

let _index = 0
elements = {0:{
	hooks:[],
	dom:null
}}

function render(elm){
	var dom_element;
	if(typeof elm === "object"){
		if(elm.name === 'fragment'){
			dom_element = document.createDocumentFragment();
		}else{
			dom_element = document.createElement(elm.name);
		}
		if(elm.options){
			for(let option in elm.options){
				if(option === "style"){
					for(let value in elm.options.style){
						dom_element.style.setProperty(value.replace(/[A-Z]/,b=>'-'+b.toLowerCase()),elm.options.style[value])
					}
				}else if(option === "onClick"){
					dom_element.addEventListener('click',elm.options[option]);
				}else if(option === "ref"){
					elm.options[option].current = dom_element
				}else{
					dom_element.setAttribute(option, elm.options[option]);
				}
			}
		}
	}else if(typeof elm === "string"){
		dom_element = document.createTextNode(elm)
	}else{
		let component = elm()
		component.base = component
		dom_element = render(component)
		//component.base = diff(component.base, rendered)
		elements[_index] = {hooks:[], dom: component}
		_index++
	}
	if(typeof elm.childrens === "string"){
		dom_element.innerHTML = elm.childrens
	}else if(elm.childrens) {
		elm.childrens.forEach(child=>dom_element.append(render(child)))
	}
	elm.renderComponent = renderComponent


	return dom_element

}

	let _root;

	let hooks = []
	let idx = 0


	function useState(initValue){
		let state
		state = elements[_index].hooks[idx] !== undefined? elements[_index].hooks[idx] : initValue
		const _idx = idx
		const setState = (newValue)=>{
			elements[_index-1].hooks[_idx] = newValue
			renderComponent(_index-1)
		}
		idx ++
		return [state,setState]
	}
	function useEffect(callback, _array){
		const oldDep = hooks[idx]
		let hasChanged = true
		if(oldDep){
			hasChanged = oldDep.some((dep,i)=>!Object.is(dep,oldDep[i]))
		}
		hooks[idx] = _array
		idx++
		if (hasChanged) callback()
	}
	function useRef(){
		return {current:null}
	}

let _template;
let _currentApp;

function init(elm,id){
	var dom = document.querySelector(id)
	_root = dom
	_template = elm
	_render()
}
const diff = (dom, vnode, parent)=>{
	if(dom){
		//console.log(vnode.childrens)
		// if(true/*dom.childNodes && vnode.childens !== undefined && vnode.childrens.length !== dom.childNodes.length*/){
		// 	console.log(render(vnode))
		// 	//dom.append(render(vnode))
		// }
		// dom.childNodes.forEach((child,i)=>{
		// 	if(typeof vnode.childrens[i] !== "string"){
		// 		diff(child, vnode.childrens[i])
		// 	}
		// })
		return dom
	}else{
		const newDom = render(vnode)
		console.log(vnode)
		parent.append(newDom)
		return newDom
	}
}

function renderComponent(component){
	let rendered = (elements[component].dom)
	console.log(rendered)
	//console.log(elements[component].dom.base)
	elements[component].dom.base = diff(render(elements[component].dom.base), rendered)
}

function _render(){
	//console.log(_template)
	diff(null, _template , _root )
	idx = 0
	// console.log(_currentApp)
	// const newApp = render(_template())
	// _currentApp? _root.replaceChild(newApp, _currentApp): _root.append(newApp)

	// _currentApp = newApp
}

module = {
	packs:[],
	exports:null
}
async function require(path){
	var script = document.createElement('script')
	script.src = path+".js"
	if(module.packs.indexOf(path) === -1){
		document.querySelector('head').append(script)
			var wait = await new Promise((resolve,reject)=>{
				script.addEventListener('load',function(event){
					resolve(module.exports)
				})
			})
		return wait
	}
}
function loadCSS(path){
	var css = document.createElement('link')
	css.rel = 'stylesheet'
	css.href = path
	document.querySelector('head').append(css)
}

return {e,require,loadCSS,init,useState,Fragment,useEffect,useRef}
})()

function globalStyle(cssRules){
	var css = document.createElement('style')
	document.querySelector('head').append(css)
	var sheet = css.sheet
	let index = 0
	for(let i in cssRules){
		var r = []
		for(j in cssRules[i]){
			r.push(j.replace(/[A-Z]/,b=>'-'+b.toLowerCase()) + ':' + cssRules[i][j])
		}
		sheet.insertRule(i+'{'+r.join(';')+'}', index)
		index ++
	}
}
// tests


function useState(initValue){
	this.state = this.state ? this.state : initValue
	const setState = (newValue)=>{
		console.log(this)
		this.setState(newValue)
	}
	return [this.state,setState]
}

function useEffect(callback, _array){
		const oldDep = this.hooks[this.idx]
		console.log(oldDep)
		let hasChanged = false
		if(oldDep){
			hasChanged = oldDep.some((dep,i)=>!Object.is(dep,oldDep[i]))
		}
		this.hooks[this.idx] = _array
		this.idx++
		if (hasChanged) renderComponent(this)
}

function useComponentDidMount(){
	this.componentDidMount()
	console.log(this)
}

class Component{
	constructor(props){
		this.props = props
		this.state = null
		useState = useState.bind(this)
	}
	setState(state){
		this.state = state
		this.renderComponent()
	}
	diff($parent, newNode, oldNode, index=0){
	
		if(!$parent) return [null,null]

		if(!oldNode){
			$parent.appendChild(renderNode(newNode, false))
		}else if(!newNode){
			$parent.removeChild($parent.childNodes[index])
		}else if(changed(newNode,oldNode)){
			$parent.replaceChild(renderNode(newNode, false), $parent.childNodes[index])
		}else if(newNode.nodeName){
			//console.log(newNode)
			const newLength = newNode.children.length
			const oldLength = oldNode.children.length

			for(let i = 0; i< Math.max(oldLength,newLength); i++){
				//console.log('1-----')
				this.diff($parent.childNodes[index], newNode.children[i], oldNode.children[i], i)
				//useComponentDidMount()
				//console.log($parent.childNodes[index])
				
			}

		}
		return [$parent,newNode]
	}
	renderComponent(){

		let rendered = this.render(this.props)
		console.log(rendered)
		this.diff(this.root, rendered, this.oldBase)



	}
}

window.all = []

const renderNode = (vnode, simu) =>{
	let el
	if(vnode.split) return document.createTextNode(vnode)
	const {nodeName,props, children} = vnode
	if (typeof nodeName === "string" || typeof nodeName === "number") {
		el = document.createElement(`${nodeName}`)
		for(let key in props){

			if(key === "onClick"){
				el.addEventListener('click',(event)=>props[key](event))
				continue
			}
			el.setAttribute(key, atributes[key])
		}
	}else if(typeof nodeName == "function"){

		var isClass = nodeName.prototype.state !== undefined?false:true
		class Oi extends Component{
			constructor(props){
				super(props)
			}
		}
		let component
		if(isClass){
			component = new nodeName(props)
		}else{
			component = new Oi(props)
			component.render = nodeName
		}
		
		const base = component.render( component.props)


		el = renderNode(base)

		component.root = el
		component.oldBase = base

		if(!simu){
			window.all.push(component)
		}


		
	
	}

	(children || []).forEach(child=>{
		el.appendChild(renderNode(child))
	})

	return el
}

const changed = (node1,node2)=>{

	if(typeof node1 !== typeof node2){
		//console.log('typeof is n1 is equal n2')
		return true
	}else{
		//console.log('typeof is n1 is not equal n2')
	}

	if(typeof node1 === "string" && node1 !== node2){
		//console.log('string')
		return true
	}else{
		//console.log('not string')
	}

	if(node1.nodeName !== node2.nodeName){
		//console.log('ok')
		return true
	}else{
		//console.log('not ok')
	}

	// return typeof node1 !== typeof node2 ||
	// (typeof node1 === "string" && node1 !== node2 ) ||
	// node1.nodeName !== node2.nodeName
}



const render = (vnode, parent)=>{
	renderNode(vnode, false)
	// for(let i = all.length- 1; i == 0; i--){
	// 	all[i].renderComponent()
	// }
	for(let app of window.all){
		//app.renderComponent()
	}
	window.all[0].root = parent
	window.all[0].oldBase = vnode
	window.all[0].renderComponent()
}
function h(nodeName, attrs, ...children){
	return {nodeName, props:attrs, children}	
}




// function h(type, props, ...children) {
//   return { type, props, children };
// }

// function createElement(node) {
//   if (typeof node === 'string') {
//     return document.createTextNode(node);
//   }
//   const $el = document.createElement(node.type);
//   node.children
//     .map(createElement)
//     .forEach($el.appendChild.bind($el));
//   return $el;
// }

// function changed(node1, node2) {
//   return typeof node1 !== typeof node2 ||
//          typeof node1 === 'string' && node1 !== node2 ||
//          node1.type !== node2.type
// }

// function updateElement($parent, newNode, oldNode, index = 0) {
//   if (!oldNode) {
//     $parent.append(
//       createElement(newNode)
//     );
//   } else if (!newNode) {
//     $parent.removeChild(
//       $parent.childNodes[index]
//     );
//   } else if (changed(newNode, oldNode)) {
//   	// console.log($parent)
//    //  $parent.replaceChild(
//    //    createElement(newNode),
//    //    $parent.childNodes[index]
//    //  );
//   } else if (newNode.type) {
//     const newLength = newNode.children.length;
//     const oldLength = oldNode.children.length;
//     for (let i = 0; i < newLength || i < oldLength; i++) {
//     if($parent){
//       updateElement(
//         $parent.childNodes[index],
//         newNode.children[i],
//         oldNode.children[i],
//         i
//       );
//       }
//     }
//   }
// }




// window.addEventListener('load',()=>{
// 	var a = h('ul', null, h('li',null,'1'),h('li',null,'2'))
// 	var right = document.querySelector('#root')
// 	updateElement(right, a)
// 	document.querySelector('#reload').addEventListener('click',function(){
// 		var b = h('ul', null, h('li',null,'4'),h('li',null,'3'), h('li',null,'4'))
// 		updateElement(right,b , a)
// 	})
// })
