import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Context } from './context/Context';
import UserPage from './pages/UserPage';
import VisitorPage from './pages/VisitorPage';
import ItemDetails from './pages/ItemDetails';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const [loginValues, setLoginValues] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [appTitle, setAppTitle] = useState('');
  const [auth, setAuth] = useState(false);
  const [item, setItem] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [datas, setDatas] = useState();
  const [formValues, setFormValues] = useState({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    user_id: item.user_id
  });
  const [userFormValues, setUserFormValues] = useState({
    id: user.id,
    username: user.username,
    password: user.password,
    created_at: user.created_at,
    modified_at: user.modified_at
  });

  console.log(allItems)
  const passContext = {
    allItems,
    setAllItems,
    item,
    setItem,
    appTitle,
    setAppTitle,
    formValues,
    setFormValues,
    userFormValues,
    setUserFormValues,
    loginValues,
    setLoginValues,
    auth,
    setAuth,
    allUsers,
    setAllUsers,
    datas,
    setDatas,
    user,
    setUser,
    userItems,
    setUserItems
  }

  return (
    <Context.Provider value={passContext}>
      <Router>
        <Routes>
          <Route path ='/login' element={<SignIn/>}/>
          <Route path ='/signup' element={<SignUp/>}/>
          <Route path ='/' element={<VisitorPage/>}/>
          <Route path ='/user/:id'element={<UserPage/>}/>
          <Route path ='/item/:id' element={<ItemDetails/>}/>
          <Route path ='/item' element={<AddItem/>}/>
          <Route path ='/itemedit/:id' element={<EditItem/>}/>
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
