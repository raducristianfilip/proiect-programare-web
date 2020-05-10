import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PizzaList() {
    const [data, setData] = useState([])

    const getData = () => {
        axios.get("http://localhost:3000/api/v1/pizzas/cart", {
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

    const delete_pizza = (id) => {
        axios.delete("http://localhost:3000/api/v1/pizzas/cart/"+id, {
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
			<h1> YOUR CART </h1>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
					<th>Blat</th>
                    <th>Toppings</th>
                    <th>Delete</th>
                </tr>
                { data.map((pizza, index) => {
                    const { _id, name, blat, toppings } = pizza
                    return (
                        <tr key={_id}>
                            <td>{_id}</td>
                            <td>{name}</td>
							<td>{blat}</td>
                            <td>{toppings.join(' ')}</td>
                            <td><button onClick={() => delete_pizza(_id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                        </tr>
                    )}) 
                }
            </table>
			<button onClick={() => empty_cart()}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    )
}

export default PizzaList;