import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import React from 'react';
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [isActual, setActual] = React.useState(false)

  React.useEffect(function () {
    fetch("http://localhost:8080/users")
    .then(res => res.json())
    .then(data => {
        setUsers(data);
        setActual(true);
    });
  }, [isActual])

  function deleteUser(id) {
      return function() {
          
        fetch("http://localhost:8080/users/" + id, {
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
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Users to chat">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Chat</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{<Link to={`/chat/${row.id}`}><MessageIcon /></Link>}</TableCell>
              <TableCell align="right">{<Link to={`/edit/${row.id}`}><EditIcon /></Link>}</TableCell>
              <TableCell align="right" onClick={deleteUser(row.id)}>
                  {<DeleteIcon />}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
