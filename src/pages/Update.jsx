import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        gender: '',
        city: '',
        pincode: ''
    })


    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(res => {
                const { fname, lname, email, gender, city, pincode } = res.data;
                setUserData({ ...userData, fname, lname, email, gender, city, pincode });
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/users'+id, userData)
        .then(res => toast.success('User registered successfully'))
        navigate('/');
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="signup-form">
                        <form action="" className="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
                            <h4 className="mb-3 text-secondary">Update Your Account</h4>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label>First Name<span className="text-danger">*</span></label>
                                    <input type="text" name="fname"
                                        className="form-control" placeholder="Enter First Name"
                                        value={userData.fname}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label>Last Name<span className="text-danger">*</span></label>
                                    <input type="text" name="lname"

                                        className="form-control" placeholder="Enter Last Name"
                                        value={userData.lname}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Email<span className="text-danger">*</span></label>
                                    <input type="email" name="email"
                                        className="form-control" placeholder="Enter Email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Gender<span className="text-danger">*</span></label>
                                    <input type="radio" name="gender"
                                        className="mx-lg-3 "
                                        value="Male"
                                        onChange={handleChange}
                                        checked={userData.gender === 'Male'}
                                    />
                                    Male
                                    <input type="radio" name="gender"
                                        className="mx-lg-3 "
                                        value="Female"
                                        onChange={handleChange}
                                        checked={userData.gender === 'Female'}
                                    />
                                    Female
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>City<span className="text-danger">*</span></label>
                                    <input type="text" name="city"
                                        className="form-control" placeholder="Enter City"
                                        value={userData.city}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label>Pincode<span className="text-danger">*</span></label>
                                    <input type="text" name="pincode"
                                        className="form-control" placeholder="Enter Pincode"
                                        value={userData.pincode}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-12">
                                    <button className="btn btn-primary float-end">Update</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Update