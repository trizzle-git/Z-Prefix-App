import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Context} from '../context/Context';
import {TopBar} from '../components/TopBar';

export default function SignInSide() {
    const {loginValues, setLoginValues, setAuth, allUsers, setAllUsers, setDatas, datas, user, setUser, setAppTitle} = React.useContext(Context);
    const nav = useNavigate();
    setAppTitle('Sign In');
    setAuth(false);

    useEffect(() => {
        fetch('http://localhost:8080/users/')
            .then(res => res.json())
            .then(data => setAllUsers(data))
      },[setAllUsers]);
      console.log(allUsers)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginValues({
          ...loginValues,
          [name]: value,
        });
      };

    const handleLogin = async () => {
        await fetch(`http://localhost:8080/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
               },
               body: JSON.stringify({...loginValues}),
        })
        .then((response) => response.status)
        .then((data) => setDatas(data))
        console.log(datas);
        if(datas === 202){
            setAuth(true)
            nav(`/user/${user.id}`)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser(allUsers.find(item => item.username === loginValues.username));
        console.log(user)
        handleLogin()
      };

    return (
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <TopBar/>
              <Avatar sx={{ m: 2, bgcolor: 'black' }}>
                <LockOutlinedIcon sx={{ backgroundColor:'black', color: 'green'}} />
              </Avatar>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username-input"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={handleInputChange}
                  sx={{border:'primary'}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="pass"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  sx={{border:'primary'}}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: 'primary' }}
                  // sx={{ color: 'yellow', backgroundColor: 'orange', borderColor: 'green' }}
                >
                  Sign In
                </Button >
                <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2" style={{color: 'rgb(79, 160, 79)'}}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
    );
}
