import * as React from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Context } from '../context/Context';


const SignUp = () => {
    const { userFormValues, setUserFormValues, setAppTitle } = useContext(Context)
    const nav = useNavigate();
    setAppTitle('Add User');
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormValues({
          ...userFormValues,
          [name]: value,
        });
      };

    const addItem = async () => {
        await fetch(`http://localhost:8080/user/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
               },
               body: JSON.stringify({...userFormValues}),
        });
        nav(`/login`)
        // history.push('/')
    };

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userFormValues);
        addItem();
      };
      return (
        <Paper square sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}>
        <TopBar/>
        <form onSubmit={handleSubmit}>
           <div>
           <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username-input"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={userFormValues.username}
                  onChange={handleInputChange}
                  sx={{border:'primary'}}
                />
            </div>
            <div>
            <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="pass"
                  label="Password"
                  type="password"
                  id="password"
                  value={userFormValues.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  sx={{border:'primary'}}
                />
            </div>
            <div>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            </div>
        </form>
        </Paper>
      );
    };

export default SignUp