import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

function Signup() {

    const alertContext = useContext(NoteContext);
    const { showAlert } = alertContext;

    const nav = useNavigate();
    const [userData, setUserData] = useState({ name: '', email: '', pwd: '', phone: '' })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createUser = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: userData.name, email: userData.email, pwd: userData.pwd, phone: userData.phone }),
        });
        const user = await createUser.json()
        console.log(user);
        if (createUser.status === 200) {
            nav('/login');
            showAlert("Account Created Successfully!", "success");
        }
        else {
            showAlert("Enter Valid Information!", "danger");
        }
    }
    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="card container my-3 text-white">
                <h4 className="title">Sign Up!</h4>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="username" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="username" placeholder="john Deo" name='name' autoComplete="name" value={userData.name} onChange={onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name='email' autoComplete="username"  value={userData.email} onChange={onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="mobile_no" className="col-sm-2 col-form-label">Mobile No</label>
                        <input type="number" className="form-control" id="mobile_no" placeholder='9848548456' name='phone' value={userData.phone} onChange={onChange} minLength={10} maxLength={10} />
                    </div>
                    <div className="field">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword" name='pwd' autoComplete="current-password" value={userData.pwd} onChange={onChange} />
                    </div>
                    <button type='submit' className='btn btn-primary mx-1'>Create Account</button>
                </form>
            </div>
        </>
    )
}

export default Signup