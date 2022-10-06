import * as React from 'react';
import { useContext, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Context } from '../context/Context';

const VisitorList = () => {
  const { setAllItems, allItems, item, setItem, setAppTitle } = useContext(Context)
  const nav = useNavigate();

  useEffect(() => {
    fetch('https://ussf-z-prefix-robinson.herokuapp.com/items')
        .then(res => res.json())
        .then(data => setAllItems(data))
  },[setAllItems]);
  
  function handleItem(Item) {
    setItem(Item);
    console.log(item);
  }

  setAppTitle('All Items');

  return (
    <Paper square sx={{ flexGrow: 1, maxWidth: 752 }}>
      <TopBar/>
        <List>
          {allItems.map((Item, index) => {
            return (
              <ListItem key={index}>
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
              </ListItem>
            );
          })}
        </List>
    </Paper>
  );
}
export default VisitorList;