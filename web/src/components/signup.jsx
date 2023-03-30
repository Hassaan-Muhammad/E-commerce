

import { useState, useContext } from "react";
import axios from 'axios';
import { GlobalContext } from '../context/Context';

import './signup.css'





function Signup() {
    let { state, dispatch } = useContext(GlobalContext);


    const [result, setResult] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signupHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/signup`, {
                firstName: name,
                lastName: name,
                email: email,
                password: password
            })

            console.log("signup successful");
            setResult("signup successful")

        } catch (e) {
            console.log("e: ", e);
        }


        // e.reset();
    }


    return (
        <div>


            {/* <div className="signupDiv">
                <h4 className="Heading">This is Signup page</h4>

                <form className="signupForm" onSubmit={signupHandler}>
                    <label> Name:</label>
                    <input className="inputfield1" type="text" name="name" placeholder="Enter your name" onChange={(e) => { setName(e.target.value) }} />
                    <br />
                    Email: <input className="inputfield2" type="email" name="username" autoComplete="username" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <br />
                    Password: <input className="inputfield3" type="password" name="new-password" autoComplete="new-password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                    <br />
                    Confirm Password: <input className="inputfield4" type="password" name="new-password" autoComplete="new-password" placeholder="confirm password" />
                    <br />
                    <button className="signupButton" type="submit">Signup</button>
                </form>
                <p>{result}</p>
            </div> */}

            {/* fake */}

            <div class="login-box">
                <h2>This is Signup page</h2>
                <form onSubmit={signupHandler}>

                    <div class="user-box">
                        <input  type="text" required="" name="name" placeholder="Enter your name" onChange={(e) => { setName(e.target.value) }} />
                        <label>Username</label>
                    </div>

                    <div class="user-box">
                        <input  type="email" name="username" autoComplete="username" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
                        <label>Email</label>
                    </div>

                    <div class="user-box">
                        <input  type="password" name="new-password" autoComplete="new-password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                        <label>Password</label>
                    </div>

                    <div class="user-box">
                        <input  type="password" name="new-password" autoComplete="new-password" placeholder="confirm password" />
                        <label>Confirm Password</label>
                    </div>


                    <a href="#">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <button className="signupButton" type="submit">Signup</button>
                    </a>
                </form>

                <p>{result}</p>
            </div>



        </div>
    )
}

export default Signup;