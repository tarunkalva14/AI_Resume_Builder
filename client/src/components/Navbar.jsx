
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import { logout } from "../app/features/authSlice";

const Navbar = () => {
    const {user} = useSelector(state=> state.auth)

    const dispacth = useDispatch()


    const navigate = useNavigate()

    const logoutUser = () => {
    sessionStorage.removeItem('token');  // Clear token from sessionStorage
    dispacth(logout())
    navigate('/')
}

    return (
        <div className=" shadow bg-indigo-800">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5
            text-white-800 transition-all">
            <Link to='/'>
                <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
            </Link>
            <div className="flex items-center gap-4 text-sm">
                <p className="max-sm:hidden text-white">Hello, {user?.name}</p>
                <button onClick={logoutUser} className="bg-white hover:bg-slate-200 border border-gray-300 px-7 py-1.5
                rounded-full active:scale-95 transition all">Logout</button>
            </div>
            </nav>
        </div>
    )
}
export default Navbar