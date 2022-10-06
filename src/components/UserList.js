import * as React from 'react';
import { useContext, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Context } from '../context/Context';

const StyledFab = styled(Fab)({
  position: 'static',
  zIndex: 1,
  top: 10,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const UserList = () => {
  const { setUserItems, userItems, item, setItem, setAppTitle, user } = useContext(Context)
  const nav = useNavigate();
  const newUserItems = [];

  useEffect(() => {
    fetch(`http://localhost:8080/items/${user.id}`)
        .then(res => res.json())
        .then(data => setUserItems(data))
  },[setUserItems, user.id]);
  console.log(userItems)
  
  function handleItem(Item) {
    setItem(Item);
    console.log(item);
  }

  const deleteItem = async () => {
    await fetch(`http://localhost:8080/item/${item.id}`, {
        method: "DELETE",
    })
    nav(`/user/${user.id}`)
    setUserItems(newUserItems)
  };

  setAppTitle(`${user.username}'s Items`);

  return (
    <Paper square sx={{ flexGrow: 1, maxWidth: 752 }}>
      <TopBar/>
      <StyledFab position="bottom" color="secondary" aria-label="add" onClick={() => {
                      setAppTitle('Add Item')
                      nav('/item')
                  }}>
              <Tooltip title="Add Item">
              <AddIcon />
              </Tooltip>
        </StyledFab>
        <List>
          {userItems.map((Item, index) => {
            newUserItems.push(Item)
            console.log(newUserItems);
            return (
              <ListItem key={index}>
                <ListItemAvatar>
                  <IconButton edge="end" aria-label="edit"
                    onClick={() => {
                      handleItem(Item)
                      nav(`/itemedit/${Item.id}`)
                    }}>
                    <EditTwoToneIcon />
                  </IconButton>
                </ListItemAvatar>
                <ListItemButton 
                  key={index}
                  onClick={() => {
                    handleItem(Item)
                    nav(`/item/${Item.id}`)
                  }}>
                  <ListItemText
                  primary={`${Item.name} qty: ${Item.quantity}`}
                  secondary={Item.description.length>99 ? Item.description.substring(0,100).concat('...') : Item.description}/>
                </ListItemButton>
                <IconButton value={Item} edge="end" aria-label="delete" onClick={() => {
                    newUserItems.splice(newUserItems.indexOf(Item))
                    handleItem(Item)
                    deleteItem(Item)
                }}>
                    <DeleteIcon />
                  </IconButton>
              </ListItem>
            );
          })}
        </List>
    </Paper>
  );
}
export default UserList;