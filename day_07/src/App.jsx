import "./App.css";
import { useState } from 'react';
import axios from 'axios';
const API = "http://localhost:8800/login";
const App = () => {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: ""
  })
  console.log(userDetail);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({ ...prev,  [name]: value }))
  }
  const submitHandler = async() => {
    const response = await axios.post(API,userDetail);
    console.log(response);  
  }
  return (
    <div>
      <h1>LOGIN</h1>
      <br />
      <input type="email" name="email" id="email" onChange={changeHandler} />
      <br></br>
      <input type="password" name="password" id="password" onChange={changeHandler} /><br />
      <button onClick={submitHandler}>LOGIN</button>
    </div>
  )
}

export default App