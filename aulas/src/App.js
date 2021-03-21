import  React,{useState,useEffect} from 'react'
import './App.css'
import {Route,Link,BrowserRouter as HashRouter,Switch} from 'react-router-dom'
import Home from './Home'
import About from './About'
import Provas from './Prova'
import Config from './Config'
import NewProva from './NewProva'
import NewItem from './NewItem'
import Item from './Item'
import Show from './Show'

import NewDirectory from './NewDirectory'

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home'
import HelpIcon from '@material-ui/icons/Help'
import BuildIcon from '@material-ui/icons/Build'
import DescriptionIcon from '@material-ui/icons/Description'
import SaveIcon from '@material-ui/icons/Save'

import {Provider} from 'react-redux'
import store from './reducers'

function Container({children}){
    return (
        <div style={{padding:10}}>
            {children}
        </div>
    )
}

const styles = {
    appbar:{
        backgroundColor:'black'
    }
}

function AppLink({to,children}){
    return (
        <Link className="menu-item" to={to} > {children} </Link>  
    )
}
function App({api}){

    return (
      <Provider store={store} >
        <HashRouter >
        <AppBar position="static" style={styles.appbar} >
            <div>
                <AppLink to="/"> 
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <HomeIcon/> 
                    </IconButton> Home
                 </AppLink>
                <AppLink to="/about" > 
                <IconButton edge="start" color="inherit" aria-label="menu">
                     <HelpIcon/> 
                </IconButton> Sobre
                </AppLink>
                <AppLink to="/provas">
                     <IconButton edge="start" color="inherit" aria-label="menu">
                    <SaveIcon/> 
                    </IconButton> Provas
                </AppLink>
                <AppLink to="/config"> 
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    <BuildIcon/> 
                    </IconButton> Configurações
                </AppLink>
                <AppLink to="/items">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    <DescriptionIcon/> 
                    </IconButton> Items
                </AppLink>
            </div>
        </AppBar>
            <Switch>
            <Container>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/provas" exact component={Show} />
                <Route path="/provas/:id" component={Provas} />
                <Route path="/config" component={Config} />
                <Route path="/new/directory" component={NewDirectory} />
		        <Route path="/new/prova" component={NewProva} />
                <Route path="/new/item/:id" component={NewItem} />
                <Route path="/items" component={Item} />
            </Switch>

            </Container>
            </Switch>
        </HashRouter>
        </Provider>

    )
}
export default App
