import React, { useState, useContext } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
var Select = require('react-select');



export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [courseName, setcourseName] = useState();
  const [error, setError] = useState();
  // const options = [
  //   'one', 'two', 'three'
  // ];
  // const defaultOption = options[0];
  var num = [1,2,3,4,5]
  const { setUserData } = useContext(UserContext);
  const history = useHistory();


  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, courseName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const [category, setCategory] = React.useState('');

  const handleCategoryChange = (category) => {
     setCategory(category);
     console.log(category);
 }
 

  var num = [1,2,3,4,5]

  return (
    <div className="page">
      <h2>GES-PDC Member Registartion form</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Please enter uottawa student email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

{/* <select name="select" onChange={this.num}>
  {num.map(function(n) { 
      return (<option value={n} selected={this.state.selected === n}>{n}</option>);
  })}
</select> */}

<select name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
            <option id="0" >Personal</option>
            <option id="1" >Work</option>
        </select>

        <label htmlFor="register-display-name">Course Name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setcourseName(e.target.value)}
        />

         
        

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
