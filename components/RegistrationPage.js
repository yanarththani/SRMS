import './css/StyleSheet.css';
import React from 'react';
export default function RegistrationPage(){

    return(
        <>
            <div className='containerReg'>
                <div className='curved_shape2'></div>
                <div className='form_box Login'>
                    <h2 style={{'--D':0,'--S':21}}>Register</h2>
                    <form action='#'>
                        <div className='input_box' style={{'--D':1,'--S':22}}>
                            <label>LecturerID</label>
                            <input type="text" name="lec_id"/><br/>
                        </div>
                        <div className='input_box' style={{'--D':2,'--S':23}}>
                            <label>Full Name</label>
                            <input type="text" name="fname"/><br/>
                        </div>
                        <div className='input_box' style={{'--D':3,'--S':24}}>
                            <label>Email</label>
                            <input type="text" name="email"/><br/>
                        </div>
                        <div className='input_box' style={{'--D':5,'--S':26}}>
                            <label>Username</label>
                            <input type="text" name="uname"/><br/>
                        </div>
                        <div className='input_box' style={{'--D':6,'--S':27}}>
                            <label>Password</label>
                            <input type="password" name="pwd"/><br/>
                        </div>
                        <div className='input_box' style={{'--D':7,'--S':28}}>
                            <label>Confirm password</label>
                            <input type="password" name="cpwd"/><br/>
                        </div>
                        <div className='input_box' style={{'--D':8,'--S':29}}>
                            <button className='btn'>Submit</button>
                        </div>
                    </form>
                </div>

                <div className="info-content Login">
                    <h2 style={{'--D':0, '--S':20}}>Student Results Management System</h2>
                </div>

            </div>
            
        </>
    )
}
