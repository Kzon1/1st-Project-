import React, { useEffect, useState } from 'react';
import { NavLink,Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import { FaCarAlt } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux'
import { getAllCategory } from '../redux/category/categorySlice';
import { getCart, getOrder } from '../redux/user/userSlice';

const Header = () => {
    const CustomerUser = useSelector(state=>state?.auth?.user)
    const orderState = useSelector(state=>state?.auth?.orders)
    const dispatch = useDispatch();
    useEffect(()=>{
    },[CustomerUser])
    useEffect(()=>{
        dispatch(getAllCategory())
        dispatch(getCart())
    },[])
    useEffect(()=>{
        if(CustomerUser?.role === "admin"){
            dispatch(getOrder())
        }
    },[])
    const orders = Array.isArray(orderState) ? orderState : [];
    const total = orders?.reduce((accumulator, order) => accumulator + order?.totalPrice, 0);
    console.log(orderState)
    const handleLogout=()=>{
        sessionStorage.clear()
        window.location.reload()
    }
    const categoryState = useSelector(state=>state?.categories?.AllCate) // lấy từ redux 
    const cartUser = useSelector(state=>state?.auth?.cartUser)
    useEffect(()=>{
        dispatch(getCart())
    },[cartUser?.length])
	return (
		<>
        <div className='position-fixed w-100' style={{zIndex:1000}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand">
                        <FaCarAlt className='fs-2 me-4'/>
                        SUPER CAR
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput/>
                            {
                                CustomerUser?.role !== "admin" &&(
                                    <li className="nav-item">
                                        <NavLink to='/' className="nav-link">HOME</NavLink>
                                    </li>
                                )
                            }
                            {
                                CustomerUser?.role !== "admin" && (
                                    <li className="nav-item dropdown">
                                        <div>
                                            <Link to="/categories" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" >
                                                CATEGORY
                                                </Link>
                                            <ul className="dropdown-menu">
                                                {/* <li><Link className="dropdown-item" to={`/categories`}>All category</Link></li> */}
                                                {Array.isArray(categoryState) && categoryState.map((i, j) => {
                                                    return (
                                                        <li key={j}>
                                                            <Link className="dropdown-item" to={`/category/${i._id}`}>{i.title}</Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </li>
                                )
                            }
                            {
                                !CustomerUser ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to='/register' className="nav-link">Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to='/login' className="nav-link">Login</NavLink>
                                        </li>
                                    </>
                                ): (
                                    <>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {CustomerUser?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            {
                                                CustomerUser?.role === "admin" &&(
                                                <NavLink to={`/dashboard${CustomerUser?.role === "admin" && '/admin'}`} className="dropdown-item">Dashboard</NavLink>
                                                )
                                            }
                                            {
                                                CustomerUser?.role === "user" &&(
                                                <NavLink to={`/dashboard${CustomerUser?.role === "user" && '/user'}`} className="dropdown-item">Dashboard</NavLink>
                                                )
                                            }
                                            <NavLink onClick={handleLogout} className="dropdown-item">Logout</NavLink>
                                        </ul>
                                        </li>
                                    </>
                                )
                            }
                            {
                                CustomerUser?.role === "user" && (
                                    <li className="nav-item">
                                        <NavLink to='/cart' className="nav-link">CART
                                            {
                                                cartUser?.length > 0 ? " ( " + cartUser?.length+" ) " : " ( 0 )"
                                            }
                                        </NavLink>
                                    </li>
                                    )
                            }
                            {
                                CustomerUser?.role === "admin" && (
                                    <li className="nav-item">
                                        <NavLink to='/' className="nav-link">Price
                                            {
                                                orderState?.length > 0 ?  " ( " + total +" ) "  : " ( 0 )"
                                            }
                                        </NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            
        </div>
        </>
	);
}

export default Header;