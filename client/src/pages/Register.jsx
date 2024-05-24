import { useState } from "react";
import '../components/global.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const {data} = await axios.post('/register', {
                name, email, password
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setData({ name: '', email: '', password: '' });
                toast.success('Registered Successfully..!! Welcome');
                navigate('/dashboard');
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="main">
            <form onSubmit={registerUser}>
                <h2>Register User</h2>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Enter the Name" />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="Enter the Email" />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    placeholder="Enter the Password" />

                <button type="submit">SignUp</button>
            </form>
        </div>
    );
}

export default Register;
