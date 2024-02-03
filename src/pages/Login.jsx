import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFromData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const [error,setError] = useState({});
    const [valid,setValid] = useState(true);
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFromData({...formData,[name]:value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        let isValid = true;
        let isValidationErrors = {};

        // Check validation for all required fields

        if(formData.email === "" || formData.email === null){
            isValid = false;
            isValidationErrors.email = 'Email is required'
            toast.warning('Email is required');
        }else if(!/\S+@\S+\.\S+/.test(formData.email)){
            isValid = false;
            isValidationErrors.email = 'Email is not valid'
            toast.warning('Email is not valid');

        }

        if(formData.password === "" || formData.password === null){
            isValid = false;
            isValidationErrors.password = 'Password is required'
            toast.warning('Password is required');

        }else if(formData.password.length < 6){
            isValid = false;
            isValidationErrors.password = 'Password must be at least 6 characters'
            toast.warning('Password must be at least 6 characters');

        }
        
        setError(isValidationErrors);
        setValid(isValid);

        if(Object.keys(isValidationErrors).length === 0){
        axios.get('http://localhost:3000/users')
        .then(res=>{
            console.log(res);
            res.data.find(user=>{
                if(user.email === formData.email){
                    if(user.password === formData.password){
                        toast.success('User Login successfully');   
                        navigate('/')
                    }
                    else{
                        // isValid = false;
                        // isValidationErrors.password = 'wrong password'
                        toast.warning('wrong password');
                    }
                }
                else{
                    // isValid = false;
                    // isValidationErrors.email = 'wrong credentials'
                    toast.warning('wrong credentials');
                }
        })
        setError(isValidationErrors);
        setValid(isValid);
        
        })
        .catch(err=>toast.warning('Something went wrong!'))     
        } 
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="signup-form">
                        <form action="" className="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
                            <h4 className="mb-3 text-secondary">Login</h4>
                            {/* {
                            valid ? <></> :
                            <span className="text-danger mb-4">
                               {error.email}{error.password}
                            </span>
                            } */}
                            <div className="row">
                               
                                <div className="mb-3 col-md-12">
                                    <label>Email<span className="text-danger">*</span></label>
                                    <input type="email" name="email" 
                                    className="form-control" placeholder="Enter Email" 
                                        onChange={handleChange}                          />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Password<span className="text-danger">*</span></label>
                                    <input type="password" name="password" 
                                    className="form-control" placeholder="Enter Password" 
                                        onChange={handleChange}                              />
                                </div>
                               
                                <div className="col-md-12">
                                    <button className="btn btn-primary float-end">Login</button>
                                </div>
                            </div>
                        </form>

                        <p className="text-center mt-3 text-secondary">If you don't have account, Please <Link to={'/signup'}>Register Now</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login