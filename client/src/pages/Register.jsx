import React from "react";
import axios from 'axios'
import {Link} from "react-router-dom" 
import { useNavigate } from "react-router-dom";
import { registreRoute } from "../utils/APIRoutes";
import styled from 'styled-components'
import Logo from '../asets/logo.svg'

import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Register=()=>{

    const goTo=useNavigate();
    const [values, setValues]=React.useState({
        username:'',
        email:'',
        password:"",
        confirmPassword:"",
    })

    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }

    React.useEffect(()=>{
        if(localStorage.getItem('chat-app-user'))
        {
            goTo('/')
        }
    },[])

    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(handleValidations())
        {
            const { password, confirmPassword,username,email}=values;
            const {data}=await axios.post(registreRoute,{
                username,email,password
            });
            if(data.status===false){
                toast.error(data.msg, toastOptions)
            }
            if(data.status===true)
            {
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                goTo('/')
            }
        }
    }

    const handleChange=(event)=>{
        setValues({ ... , [event.target.name]: event.target.value });
    }

    const handleValidations=()=>{
        const { password, confirmPassword,username,email}=values;
        if(password!== confirmPassword)
        {
            toast.error("Password and confirm password should be the same",toastOptions);
            return false
        }else if(username.length<4)
        {
            toast.error("Username has to be longer,at least 4 charakters",toastOptions);
            return false
        }else if(password.length<5)
        {
            toast.error("Password has to be longer,at least 5 charakters",toastOptions);
            return false
        }else if(email==="")
        {
            toast.error("email is required",toastOptions);
            return false
        }
        return true;

    }

    
    return(
        <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="Logo"/>
                    <h1>snappy</h1>
                </div>
                <input type="text"
                placeholder="Username"
                name="username"
                onChange={(e)=>handleChange(e)}
                />
                <input type="email"
                placeholder="Email"
                name="email"
                onChange={(e)=>handleChange(e)}
                />
                <input type="password"
                placeholder="Password"
                name="password"
                onChange={(e)=>handleChange(e)}
                />
                <input type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e)=>handleChange(e)}
                />
                <button type="submit">Create User</button>
                <span>Already have an acount? <Link to="/login">Login</Link> </span>
            </form>
        </FormContainer>
        <ToastContainer/>
        </>
    )
    
}


const FormContainer=styled.div`
    height: 100vh;
    width:100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
        display: flex;
        align-items: center;
        gap:1rem;
        justify-content: center;
        img{
            height: 5rem;
        }
        h1{
            color: white;
            text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding:1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button{
            background-color: #997af0;
            color:white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out ;
            &:hover{
                background-color: #4e0eff;
            }
        }
        span{
            color: white;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-transform: none;
                font-weight: bold;
            }
        }
    }


`;



export default Register;