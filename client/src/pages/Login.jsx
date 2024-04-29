import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import CustomInput from '../components/CustomInput';
import {useDispatch,useSelector} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from "../components/Container";
import { login } from "../redux/user/userSlice";
const Login = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    let userSchema = Yup.object().shape({
        email: Yup.string().email('Email should be valid').required('Email is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        password: Yup.string().required('Passsword is Required')
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password:""
        },
        validationSchema:userSchema,
        onSubmit: values => {
            dispatch(login(values))
            
        },
    });
    const user = useSelector(state=>state.auth?.user)
    if(user!== null){
        navigate('/')
    }
  // form function
  return (
        <Container class1="login-wrapper home-wrapper-2 py-5"> 
            <div className="" style={{ minHeight: "90vh",paddingTop:"100px"}}>
                <h1 className="text-center">LOGIN</h1>
                <div className="d-flex align-items-center justify-content-center">
                <form onSubmit={formik.handleSubmit} action="" style={{width:"1000px" }} className='p-5 flex-column gap-15'>
                    <CustomInput 
                            values={formik.values.email} 
                            type="email" 
                            name='email' 
                            placeholder='Email ...'
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                            />
                        <div className="error">
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <CustomInput 
                            values={formik.values.password} 
                            type="password" 
                            name='password' 
                            placeholder='Enter Password ...'
                            onChange={formik.handleChange("password")}
                            onBlur={formik.handleBlur("password")}
                            />
                        <div className="error">
                            {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                            ) : null}
                        </div>
                    <div className="">
                    <div className="mt-3 d-flex justify-content-between gap-15 align-items-center">
                            <button className='btn btn-primary' type='submit'>Login</button>
                            <Link to='/register' className='border-0 button signup'>Register</Link>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </Container>
  );
};

export default Login;