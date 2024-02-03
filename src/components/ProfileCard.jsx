import { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
const ProfileCard = () => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = () => {
    axios.get('http://localhost:3000/users')
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }
  useEffect(() => {
    fetchUserData();
  }, [])
  return (
    <>
      {userData.map((user) => (
        <div class="profile-card text-center shadow bg-light p-4 my-5 rounded-3">
          <div class="profile-photo shadow" key={user.id}>
            <img src="../user_profile.png" class="img-fluid" />
          </div>
          <h3 class="pt-3 text-dark">{user.fname} {user.lname}</h3>
          <p class="text-secondary">{user.email}</p>
          <p class="text-secondary">{user.gender}</p>
          <p class="text-secondary">{user.city}</p>
          <p class="text-secondary">{user.pincode}</p>
          <Link to={`/update/${user.id}`}>
            <button className='text-bg-success border-0 fw-bold px-4 py-2  '>Edit</button>
          </Link>
        </div>
      ))}
    </>
  )
}
export default ProfileCard