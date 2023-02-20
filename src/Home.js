
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/images/logo.png";

const Home = () => {
    const usenavigate = useNavigate();
    
    const[displayusername,displayusernameupdate]=useState('');
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }else{
            displayusernameupdate(username);
        }

        let jwttoken = sessionStorage.getItem('jwttoken');
        fetch("https://soal.staging.id/api/home", {
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
        }
        ).catch((err) => {
            console.log(err.messsage)
        }
        );

    }, []);
   
    return (
        <div>
            <div className="header">
                <Link sx={{ my: 1, mx: 1.5 }} to={'/home'}>Home</Link>
                <Link sx={{ my: 1, mx: 1.5 }} to ={'/menulist'}>Menu</Link>
                <Link sx={{ my: 1, mx: 1.5 }} to={'/'}>Logout</Link>
               
            </div>
            <img src={logo} alt="logo" className="logo" />
         <h3 className="text-center">Welcome to {displayusername}</h3> 
           
        </div>
    );
}

export default Home;