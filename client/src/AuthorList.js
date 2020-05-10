import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function AuthorList() {
    const [data, setData] = useState([])

    const getData = () => {
        axios.get("http://localhost:3000/api/v1/authors/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setData(response.data);
        })
        .catch(err => console.error(err));
    };

    const submit = () => {
        axios.post("http://localhost:3000/api/v1/authors/", {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            getData();
        })
        .catch(err => console.error(err));
    }

    const delete_author = (id) => {
		axios.delete("http://localhost:3000/api/v1/authors/"+id, {
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
            <form>
				<fieldset>		
						<legend> Adauga un nou autor: </legend>
						<label>
							First Name:
							<input type="text" defaultValue="" id="firstName" />
						</label><br></br>
						<label>
							Last Name:
							<input type="text" defaultValue="" id="lastName" />
						</label><br></br>
						<input type="submit" value="Submit" onClick={submit} />
				</fieldset>
            </form>

            <table>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Delete</th>
                </tr>
                { data.map((author, index) => {
                    const { _id, firstName, lastName } = author
                    return (
                        <tr key={_id}>
                            <td>{_id}</td>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td><button onClick={() => delete_author(_id)}><FontAwesomeIcon icon={faTrash} /></button></td>
                        </tr>
                    )}) 
                }
            </table>
        </div>
    )
}

export default AuthorList;