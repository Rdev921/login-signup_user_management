import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Signup = () => {
    const [formData, setFromData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmpassword: '',
        gender: '',
        city:'',
        pincode:''
    })
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [valid, setValid] = useState(true);

    const handleChange = (e) => {
        const file = e.target.files;
        const { name, value } = e.target;
        console.log(file);
        setFromData({ ...formData, [name]: value, file })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let isValidationErrors = {};

        // Check validation for all required fields

        if (formData.fname === "" || formData.fname === null) {
            isValid = false;
            isValidationErrors.fname = 'First name required'
            toast.warning('First name required')
        }

        if (formData.lname === "" || formData.lname === null) {
            isValid = false;
            isValidationErrors.lname = 'Last name required'
            toast.warning('Last name required')

        }

        if (formData.email === "" || formData.email === null) {
            isValid = false;
            isValidationErrors.email = 'Email is required'
            toast.warning('Email is required')

        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            isValidationErrors.email = 'Email is not valid'
            toast.warning('Email is not valid')

        }

        if (formData.password === "" || formData.password === null) {
            isValid = false;
            isValidationErrors.password = 'Password is required'
            toast.warning('Password is required')

        } else if (formData.password.length < 6) {
            isValid = false;
            isValidationErrors.password = 'Password must be at least 6 characters'
            toast.warning('Password must be at least 6 characters')

        }

        if (formData.password !== formData.confirmpassword) {
            isValid = false;
            isValidationErrors.confirmpassword = 'Password does not match'
            toast.warning('Password does not match')

        }
        setError(isValidationErrors);
        setValid(isValid);


        if (Object.keys(isValidationErrors).length === 0) {
            axios.post('http://localhost:3000/users', formData)
                .then(res => toast.success('User registered successfully'))
                .catch(err => toast.warning('Something went wrong!'))
            navigate('/login');
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="signup-form">
                        <form action="" className="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
                            <h4 className="mb-3 text-secondary">Create Your Account</h4>
                            {/* {
                            valid ? <></> :
                            <span className="text-danger mb-4">
                                {error.fname}{error.lname}{error.email}{error.password}{error.confirmpassword}
                            </span>
                            } */}
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label>First Name<span className="text-danger">*</span></label>
                                    <input type="text" name="fname"
                                        className="form-control" placeholder="Enter First Name"
                                        onChange={handleChange} />
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label>Last Name<span className="text-danger">*</span></label>
                                    <input type="text" name="lname"

                                        className="form-control" placeholder="Enter Last Name"
                                        onChange={handleChange} />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Email<span className="text-danger">*</span></label>
                                    <input type="email" name="email"
                                        className="form-control" placeholder="Enter Email"
                                        onChange={handleChange} />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Gender<span className="text-danger">*</span></label>
                                    <input type="radio" name="gender"
                                        onChange={handleChange} className="mx-lg-3 " 
                                            value="Male"
                                        />
                                    Male
                                    <input type="radio" name="gender"
                                        onChange={handleChange} className="mx-lg-3 " 
                                            value="Female"
                                        />
                                    Female
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>City<span className="text-danger">*</span></label>
                                    <input type="text" name="city"
                                        className="form-control" placeholder="Enter City"
                                        onChange={handleChange} />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Pincode<span className="text-danger">*</span></label>
                                    <input type="text" name="pincode"
                                        className="form-control" placeholder="Enter Pincode"
                                        onChange={handleChange} />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Password<span className="text-danger">*</span></label>
                                    <input type="password" name="password"
                                        className="form-control" placeholder="Enter Password"
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label>Confirm Password<span className="text-danger">*</span></label>
                                    <input type="password" name="confirmpassword"

                                        className="form-control" placeholder="Confirm Password"
                                        onChange={handleChange} />
                                </div>


                                
                                <div className="col-md-12">
                                    <button className="btn btn-primary float-end">Register</button>
                                </div>
                            </div>
                        </form>

                        <p className="text-center mt-3 text-secondary">If you have account, Please <Link to={'/login'}>Login Now</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup