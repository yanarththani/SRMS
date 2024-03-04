import { React } from "react";
import './css/StyleSheet.css';
export default function LoginPage(){

    return(
        <div>
            <div className="container">
                <div className="curved_shape1"></div>
                <div className="form_box Login">
                    <h2 style={{'--D':0, '--S':21}}>Login</h2>
                    <form action="#">
                        <div className="input_box" style={{'--D':1, '--S':22}}>
                            <label>Username</label>
                            <input type="text" name="uname"/><br/>
                        </div>
                        <div className="input_box" style={{'--D':2, '--S':23}}>
                            <label>Password</label>
                            <input type="password" name="pwd"/><br/>
                        </div>
                        <div className="input_box" style={{'--D':3, '--S':24}}>
                            <button className="btn">Login</button>
                        </div>
                        
                    </form>
                </div>

                <div className="info-content Login">
                    <h2 style={{'--D':0, '--S':20}}>Student Results Management System</h2>
                </div>
            </div>
        </div>
    )
}
