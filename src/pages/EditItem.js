import * as React from 'react';
import { TextField,Button, Paper} from '@mui/material';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Context } from '../context/Context';


const EditItem = () => {
    const { item, formValues, setFormValues, setAppTitle, user } = useContext(Context)
    const nav = useNavigate();
    setAppTitle('Edit Item')
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    const editItem = async () => {
        await fetch(`http://localhost:8080/item/${item.id}`, {
            method: "PATCH",
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
        editItem();
      };
      return (
        <Paper square sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          >
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
                // placeholder={item.name}
                defaultValue={item.name}
              />
            <TextField
                id="quantity-input"
                name="quantity"
                label="Quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleInputChange}
                defaultValue={item.quantity}
              />
            </div>
            <div>
            <TextField
                id="description-input"
                name="description"
                label="Item Description"
                multiline
                rows={4}
                value={formValues.description}
                onChange={handleInputChange}
                defaultValue={item.description}
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

export default EditItem