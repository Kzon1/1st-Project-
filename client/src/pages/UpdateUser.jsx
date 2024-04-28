import React, { useEffect } from 'react'
import UserMenu from '../components/UserMenu'
import { Link, useNavigate ,useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from '../components/CustomInput';
import {edUser} from '../redux/user/userSlice';
let schema = yup.object().shape({
    name: yup.string().required("name is Required"),
    email: yup.string().email("Email is wrong").required("email is Required"),
    password: yup.string().required("password is Required"),
    mobile: yup.string().required("mobile is Required"),
    address: yup.string().required("address is Required"),
});
export default function UpdateUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getAUser = useSelector((state) => state?.auth?.user);
    
    const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
        name: getAUser?.name ||"",
        email:  getAUser?.email ||"",
        password:  getAUser?.password ||"",
        mobile:  getAUser?.mobile ||"",
        address:  getAUser?.address ||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        const data = {_id : getAUser?._id,data : values}
        dispatch(edUser(data))
        toast.success("User Updated Successfullly!");
        navigate('/dashboard/user')
        // window.location.reload()
    },
    });
  return (
    <div className='container-fluid' style={{minHeight:"100vh",paddingTop:"100px"}}>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    <h3 className='mb-4 title'>update User</h3>
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
                                values={formik.values.password}
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
                                Update User
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
  )
}
