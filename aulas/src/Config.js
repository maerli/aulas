import React from 'react'
import {Link} from 'react-router-dom'
import Delete from './Delete'

function Config(){
    return (
	<>
        <div>
        <Link to="/new/directory" > novo diretorio </Link>
        </div>
	<div>
	<Link to="/new/prova"> nova prova </Link>
	<div>
	<Link to="/new/item"> novo item </Link>
	</div>
	</div>
	<Delete/>
	</>
    )
}
export default Config
