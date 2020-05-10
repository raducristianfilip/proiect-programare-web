import React from 'react';
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import Register from './Register';
import Authenticate from './Authenticate';
import PizzaList from './PizzaList';
import Cos from './Cos';
import QuestionForm from './Question';
import QuestionList from './faq';
import './App.css';
import { faHome, faBook, faPen, faAt, faShoppingCart, faPizzaSlice, faSignInAlt, faFileSignature} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
return (
	<div>
	<h1> Pizza Shop </h1>
	<div className="container">
  
    <HashRouter baseline="/">
      <Switch>
        <Route exact path={"/"} component={() => 
          <div className="content">
				
			  <div class="inline"><span><FontAwesomeIcon icon={faFileSignature} /></span><Link to="/register">Register</Link></div>
               <div class="inline"><span><FontAwesomeIcon icon={faSignInAlt} /></span><Link to="/authenticate">Authenticate</Link></div>
               <div class="inline"><span><FontAwesomeIcon icon={faPizzaSlice} /></span><Link to="/pizzas">Pizzas</Link></div>
			   <div class="inline"><span><FontAwesomeIcon icon={faShoppingCart} /></span><Link to="/Cos">Cos</Link></div>
			   <div class="inline"><span><FontAwesomeIcon icon={faAt} /></span><Link to="/questions">Contact</Link></div>
			   <div class="inline"><span><FontAwesomeIcon icon={faBook} /></span><Link to="/faq">F.A.Q.</Link></div>
          </div>
        }></Route>
		
		<Route path={"/register"} component={Register}></Route>
        <Route path={"/authenticate"} component={Authenticate}></Route>
        <Route path={"/pizzas"} component={PizzaList}></Route>
		<Route path={"/Cos"} component={Cos}></Route>
		<Route path={"/questions"} component={QuestionForm}></Route>
		<Route path={"/faq"} component={QuestionList}></Route>
      </Switch>
    </HashRouter>
	</div>
	</div>
  );
}
export default App;
