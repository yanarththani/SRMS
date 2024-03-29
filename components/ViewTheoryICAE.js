import React, { useEffect, useState } from 'react';
export default function ViewTheoryICAE(){
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8081/icae")
        .then(res=>res.json())
        .then(data =>setData(data))
        .then(err=>console.log(err))
    },[])
    return(
        <div>
            <h1>
                ICAE Results
            </h1>
            <table border={1}>
                <thead>
                    <th>Registartion No</th>
                    <th>ICAE 01</th>
                    <th>ICAE 02</th>
                    <th>ICAE 03</th>
                </thead>
                <tbody>
                    {data.map((d,i)=>(
                        <tr key={i}>
                            <td>{d.RegistrationNo}</td>
                            <td>{d.ICAE1}</td>
                            <td>{d.ICAE2}</td>
                            <td>{d.ICAE3}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}