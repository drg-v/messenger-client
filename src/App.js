import logo from './logo.svg';
import './App.css';
import Users from './components/users';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


function App() {

  return (
    <div className="app">
      <h1>Select user to send a message</h1>
      <Link to="/create"><Button variant="contained">Create user</Button></Link>
      <Users />
    </div>
  );
}

export default App;
