import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function PizzaList() {
    const [data, setData] = useState([])

    const getData = () => {
        axios.get("http://localhost:3000/api/v1/pizzas/", {
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
        axios.post("http://localhost:3000/api/v1/pizzas/", {
            name: document.getElementById("name").value,
            blat: document.getElementById("blat").value,
            toppings: document.getElementById("toppings").value.split(' ')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            getData();
        })
        .catch(err => {
            alert('Invalid toppings. Use space to delimitate genres in the list.')
            console.error(err)
        });
    }

    const delete_pizza = (id) => {
        axios.delete("http://localhost:3000/api/v1/pizzas/"+id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            getData();
        })
        .catch(err => console.error(err));
    };
	
	const addPizzaToCart = (id) => {
        axios.post("http://localhost:3000/api/v1/pizzas/cart/"+id, {
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
			<h1> PIZZA MENU </h1>
            <form className="frm">
				<fieldset>
					<legend>Add a new pizza: </legend>
					<label>
						Name:
						<input type="text" defaultValue="" id="name" />
					</label><br></br>
					<label>
						Blat:
						<input type="text" defaultValue="" id="blat" />
					</label><br></br>
					<label>
						Toppings:
						<input type="text" defaultValue="" id="toppings" />
					</label><br></br>
					<input type="submit" value="Create your own pizza" onClick={submit} />
				</fieldset>
            </form>

            <table>
                <tr>
                    <th>Name</th>
					<th>Blat</th>
                    <th>Toppings</th>
                    <th>Add to Cart</th>
                </tr>
                { data.map((pizza, index) => {
                    const { _id, name, blat, toppings } = pizza
                    return (
                        <tr key={_id}>
                            <td>{name}</td>
							<td>{blat}</td>
                            <td>{toppings.join(' ')}</td>
                            <td><button className="buton" onClick={() => addPizzaToCart(_id)}>Adauga<FontAwesomeIcon icon={faShoppingCart} /></button></td>
                        </tr>
                    )}) 
                }
            </table>
        </div>
    )
}

export default PizzaList;