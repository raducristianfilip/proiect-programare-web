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
			<h1> FAQ </h1>
            <table>
                <tr>
                    {/*<th>Question Id</th>*/}
                    <th>Title</th>
					<th>Text</th>
                    {/*<th>Mark Question</th>*/}
                </tr>
                { data.map((question, index) => {
                    const { _id, name, text } = question
                    return (
                        <tr key={_id}>
                            {/*<td>{_id}</td>*/}
                            <td>{name}</td>
							<td>{text}</td>
						</tr>
                    )}) 
                }
            </table>
        </div>
    )
}

export default QuestionForm;