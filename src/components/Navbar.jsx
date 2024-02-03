import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid ">
                    <Link to={'/'} className="navbar-brand">Profilo</Link>
                    
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={'/signup'} className="nav-link" href="#">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link" href="#">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar