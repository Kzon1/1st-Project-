import React, { useEffect, useState } from 'react'
import { Link, useNavigate ,useParams} from 'react-router-dom';
import AdminMenu from '../components/AdminMenu';
import {useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from '../components/CustomInput';
import { getUser, register, resetState, udUser } from '../redux/user/userSlice';
let schema = yup.object().shape({
    name: yup.string().required("name is Required"),
    email: yup.string().email("Email is wrong").required("email is Required"),
    mobile: yup.string().required("mobile is Required"),
    address: yup.string().required("address is Required"),
    password: yup.string().required("password is Required"),
});
export default function AddUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getAUser = useSelector((state) => state?.auth?.auser?.getUser);
    
    const {id}= useParams()
    console.log(getAUser)
    useEffect(() => {
      if (id !== undefined) {
        dispatch(getUser(id));
      } else {
        dispatch(resetState());
      }
    }, [id]);
    const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
        name: getAUser?.name ||"",
        email:  getAUser?.email ||"",
        mobile:  getAUser?.mobile ||"",
        password:  getAUser?.password ||"",
        address:  getAUser?.address ||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        if(id !== undefined){
            const data = {_id : id,data : values}
            dispatch(udUser(data))
            toast.success("User Updated Successfullly!");
            navigate('/dashboard/admin/list-users')
            window.location.reload()
        }else{
            dispatch(register(values));
            formik.resetForm();
            setTimeout(() => {
            navigate('/dashboard/admin/list-users')
            }, 500);
        }
        },
    });
    return (
    <>
        <div className='container-fluid' style={{minHeight:"100vh",paddingTop:"100px"}}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <h3 className='mb-4 title'>{id !== undefined ? "Update":"Add"} User</h3>
                    <div className="">
                        <form action="" onSubmit={formik.handleSubmit}>
                            <CustomInput 
                                type ="text" 
                                placeholder ="Enter Name"
                                onChange={formik.handleChange("name")}
                                onBlur={formik.handleBlur("name")}
                                values={formik.values.name}
                                />
                            <div className="error">
                                {formik.touched.name && formik.errors.name}
                            </div>
                            <CustomInput 
                                type ="email" 
                                placeholder ="Enter email"
                                onChange={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                                values={formik.values.email}
                                />
                            <div className="error">
                                {formik.touched.email && formik.errors.email}
                            </div>
                            <CustomInput 
                                type ="password" 
                                placeholder ="Enter password"
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                                vavaluesl={formik.values.password}
                                />
                            <div className="error">
                                {formik.touched.password && formik.errors.password}
                            </div>
                            <CustomInput 
                                type ="text" 
                                placeholder ="Enter mobile"
                                onChange={formik.handleChange("mobile")}
                                onBlur={formik.handleBlur("mobile")}
                                values={formik.values.mobile}
                                />
                            <div className="error">
                                {formik.touched.mobile && formik.errors.mobile}
                            </div>
                            <CustomInput 
                                type ="text" 
                                placeholder ="Enter address"
                                onChange={formik.handleChange("address")}
                                onBlur={formik.handleBlur("address")}
                                values={formik.values.address}
                                />
                            <div className="error">
                                {formik.touched.address && formik.errors.address}
                            </div>
                            <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                                {id !== undefined ? "Update":"Add"} User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}
