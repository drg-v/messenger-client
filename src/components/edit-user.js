import { useParams } from 'react-router-dom';
import React from "react";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import '../App.css';
import {useNavigate} from 'react-router-dom';

export default function EditUser() {
    let params = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = React.useState(
        {
            name: "",
            password: ""
        }
    );

    function handleChange(event) {
        const {name, value} = event.target
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userData);
        let data = {
            id: Number(params.userId),
            name: userData.name,
            password: userData.password
        }
        fetch("http://localhost:8080/users", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                navigate("/");
            }
        });

    }

    return (
        <form className="create-user" onSubmit={handleSubmit}>
            <h1>Enter user fields</h1>
            <InputLabel shrink htmlFor="username">
                Username
            </InputLabel>
            <div className="input" id="username">
                <TextField
                    className="input"
                    required
                    id="outlined-required"
                    label="Required"
                    placeholder="username"
                    onChange={handleChange}
                    name="name"
                    value={userData.name}
                />
            </div>
            <InputLabel shrink htmlFor="password">
                Password
            </InputLabel>
            <div className="input" id="password">
                <TextField
                    required
                    className="input"
                    id="outlined-required"
                    label="Required"
                    placeholder="password"
                    onChange={handleChange}
                    name="password"
                    value={userData.password}
                />
            </div>
            <div className="input">
                <Button variant="outlined" size="medium" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    );
}