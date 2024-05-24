import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email : '',
        password : ''
    })

    const loginUser = async (e) => {
        e.preventDefault();
        const {email, password} = data;
        try{
            const {data} = await axios.post('/login', {
                email, password
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setData({email: '', password: '' });
                toast.success('Login Successfully..!! Welcome');
                navigate('/dashboard');
            }             
        }     
        catch(error){
            console.log(error);
        }

    }

    return (
        <div className="main">
            <form onSubmit={loginUser}>
                <h2>User Login</h2>
                <label htmlFor="email">Name : </label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={data.email} 
                    onChange={(e)=>setData({...data, email : e.target.value})} 
                    placeholder="Enter the Email" />

                <label htmlFor="password">Password : </label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={data.password} 
                    onChange={(e)=>setData({...data, password : e.target.value})} 
                    placeholder="Enter the Password" />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login