import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import CustomInput from '../components/CustomInput';
import {useDispatch,useSelector} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from "../components/Container";
import { register } from "../redux/user/userSlice";
const Register = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    let userSchema = Yup.object().shape({
        name: Yup.string().required('Name is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        email: Yup.string().email('Email should be valid').required('Email is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        address: Yup.string().required('address is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        mobile: Yup.string().required('mobile is Required'),
        password: Yup.string().required('Passsword is Required')
    });
    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            address:"",
            mobile:"",
            password:""
        },
        validationSchema:userSchema,
        onSubmit: values => {
            dispatch(register(values))
            navigate('/')
        },
    });
    const user = useSelector(state=>state.auth.register)
  // form function
  return (
        <Container class1="login-wrapper home-wrapper-2 py-5"> 
            <div className="" style={{ minHeight: "90vh",paddingTop:"100px"}}>
                <h1 className="text-center">REGISTER</h1>
                <div className="d-flex align-items-center justify-content-center">
                <form onSubmit={formik.handleSubmit} action="" style={{width:"1000px" }} className='p-5 flex-column gap-15'>
                    <CustomInput 
                        values={formik.values.name} 
                        type="name" 
                        name='name' 
                        placeholder='Enter name ...'
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        />
                    <div className="error">
                        {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <CustomInput 
                        values={formik.values.email} 
                        type="email" 
                        name='email' 
                        placeholder='Enter Email ...'
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput 
                        values={formik.values.mobile} 
                        type="mobile" 
                        name='mobile' 
                        placeholder='Enter mobile ...'
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        />
                    <div className="error">
                        {formik.touched.mobile && formik.errors.mobile ? (
                            <div>{formik.errors.mobile}</div>
                        ) : null}
                    </div>
                    <CustomInput 
                        values={formik.values.address} 
                        type="address" 
                        name='address' 
                        placeholder='Enter address ...'
                        onChange={formik.handleChange("address")}
                        onBlur={formik.handleBlur("address")}
                        />
                    <div className="error">
                        {formik.touched.address && formik.errors.address ? (
                            <div>{formik.errors.address}</div>
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
                            <button className='btn btn-primary' type='submit'>Register</button>
                            <Link to='/login' className='border-0 button signup'>Login</Link>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </Container>
  );
};

export default Register;