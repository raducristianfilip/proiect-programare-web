import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function QuestionForm() {
    const [data, setData] = useState([])

    const getData = () => {
        axios.get("http://localhost:3000/api/v1/questions/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            console.log(response.data);
            setData(response.data);
        })
        .catch(err => console.error(err));
    };

     const submit = () => {
        axios.post("http://localhost:3000/api/v1/questions/", {
            name: document.getElementById("name").value,
            text: document.getElementById("text").value
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            getData();
        })
        .catch(err => console.error(err));
    };
	
	const empty_cart = () => {
        axios.delete("http://localhost:3000/api/v1/pizzas/cart/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            getData();
        })
        .catch(err => console.error(err));
    };

    useEffect(getData, []);

    return (
	
        <div>
			<h1> ASK A QUESTION </h1>
			<div className="frm">
			<form>
            <label>
                Name:
                <input type="text" defaultValue="" id="name" />
            </label><br></br>
            <label>
				<div className="resizable">
				Text:
					<input type="text" defaultValue="" id="text" />
				</div>
            </label><br></br>
            <input type="submit" value="Submit" onClick={submit} />
        </form>
			</div>
        </div>
    )
}

export default QuestionForm;