import * as React from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Context } from '../context/Context';


const AddItem = () => {
    const { formValues, setFormValues, setAppTitle, user } = useContext(Context)
    const nav = useNavigate();
    setAppTitle('Add Item');
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    const addItem = async () => {
        await fetch(`https://ussf-z-prefix-robinson.herokuapp.com/item/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
               },
               body: JSON.stringify({...formValues}),
        });
        nav(`/user/${user.id}`)
        // history.push('/')
    };

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
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
                id="name-input"
                name="name"
                label="Item Name"
                type="text"
                value={formValues.name}
                onChange={handleInputChange}
              />
            <TextField
                id="quantity-input"
                name="quantity"
                label="Quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div>
            <TextField
                id="description-input"
                name="description"
                label="Item Description"
                type="text"
                multiline
                rows={4}
                value={formValues.description}
                onChange={handleInputChange}
              />
              <TextField
                id="userid-input"
                name="user_id"
                label="UserID"
                type="number"
                value={formValues.user_id}
                onChange={handleInputChange}
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

export default AddItem