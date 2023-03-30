import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';

import axios from 'axios';
import './login.css'
import { Link } from "react-router-dom";




function Login() {
    let { state, dispatch } = useContext(GlobalContext);


    const [result, setResult] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/login`, {

                email: email,
                password: password
            }, {
                withCredentials: true
            })

            dispatch({
                type: 'USER_LOGIN',
                payload: response.data.profile
            })

            console.log("Login successful");
            setResult("Login successful")

        } catch (e) {
            console.log("e: ", e);
        }

        // e.reset();
    }



    return (

        <div>



            {/* <div className="loginDiv">
                <h4 className="headingLogin">This is Login page</h4>

                {state.text}

                <form onSubmit={loginHandler} className="loginForm">


                    <textarea
                        className="TextField"
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="username"
                        placeholder="email"
                        autoComplete="username"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />


                    <br />

                    <textarea
                        className="TextField"
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="current-password"
                        autoComplete="current-password"
                        placeholder="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <br />

                </form>
                <br />



            </div> */}



            {/* fake */}
            <div class="login-box">
                <h2>Login</h2>
                {state.text}
                <form onSubmit={loginHandler}>
                    <div class="user-box">
                        <input
                            required=""

                            id="email"
                            type="email"
                            name="username"
                            placeholder="email"
                            autoComplete="username"
                            onChange={(e) => { setEmail(e.target.value) }} />
                        <label>Username</label>
                    </div>

                    <div class="user-box">
                        <input
                            required=""

                            id="password"
                            type="password"
                            name="current-password"
                            autoComplete="current-password"
                            placeholder="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <label>Password</label>
                    </div>

                    <a href="#">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <button className="loginbutton" type="submit">Login</button>
                    </a>
                </form>

                <br/>
                
                <Link className="forgotButton" to={`/forget-password`}>Forget Password</Link>

                <p>{result}</p>

            </div>




        </div>
    )
}

export default Login;