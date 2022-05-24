import React from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

export default function Chat() {
    const [messages, setMessages] = React.useState([]);
    const [isActual, setActual] = React.useState(false)
    let params = useParams();
    const navigate = useNavigate();

    const [messageData, setMessageData] = React.useState(
        {
            receiver: "",
            text: "",
        }
    );
    
    function handleChange(event) {
        const {name, value} = event.target
        setMessageData(prevMessageData => {
            return {
                ...prevMessageData,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(messageData);
        messageData.receiver = Number(messageData.receiver);
        messageData.sender = Number(params.userId);
        fetch("http://localhost:8080/messages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                navigate("/");
            }
        });

    }

    React.useEffect(function () {
        fetch("http://localhost:8080/messages/" + params.userId)
        .then(res => res.json())
        .then(data => {
            setMessages(data);
            setActual(true);
        });
      }, [isActual, params.userId]);

    function deleteMessage(id) {
        return function() {
          
            fetch("http://localhost:8080/messages/" + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setActual(false);
                }
            });
        }
    }

    return (
        <div className='app'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Messages">
                    <TableHead>
                    <TableRow>
                        <TableCell>Sender id</TableCell>
                        <TableCell align="right">Message</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {messages.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.sender}
                        </TableCell>
                        <TableCell align="right">{row.text}</TableCell>
                        <TableCell align="right" onClick={deleteMessage(row.id)}>
                            {<DeleteIcon />}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <form onSubmit={handleSubmit}>
            <h1>Enter message fields</h1>
            <InputLabel shrink htmlFor="username">
                Receiver id
            </InputLabel>
            <div className="input" id="username">
                <TextField
                    className="input"
                    required
                    id="outlined-required"
                    label="Required"
                    placeholder="receiver id"
                    onChange={handleChange}
                    name="receiver"
                    value={messageData.name}
                />
            </div>
            <InputLabel shrink htmlFor="password">
                Message
            </InputLabel>
            <div className="input" id="password">
                <TextField
                    required
                    className="input"
                    id="outlined-required"
                    label="Required"
                    placeholder="message"
                    onChange={handleChange}
                    name="text"
                    value={messageData.text}
                />
            </div>
            <div className="input">
                <Button variant="outlined" size="medium" type="submit">
                    Submit
                </Button>
            </div>
        </form>
        </div>
    );
}