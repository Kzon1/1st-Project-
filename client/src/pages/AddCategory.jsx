import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams} from 'react-router-dom';
import AdminMenu from '../components/AdminMenu';
import {useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from '../components/CustomInput';
import {getCategory,addCategory, updateCategory } from '../redux/category/categorySlice';
import { resetState } from '../redux/user/userSlice';

let schema = yup.object().shape({
    title: yup.string().required("title is Required"),
});
export default function AddCategory() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getCate = useSelector((state) => state?.categories?.getCategory?.getCategory);
    
    const {id}= useParams()
    console.log(getCate)
    useEffect(() => {
      if (id !== undefined) {
        dispatch(getCategory(id));
      } else {
        dispatch(resetState());
      }
    }, [id]);
    const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
        title: getCate?.title || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        if(id !== undefined){
            const data = {_id : id,data : values}
            dispatch(updateCategory(data))
            toast.success("User Updated Successfullly!");
            navigate('/dashboard/admin/list-category')
            window.location.reload()
        }else{
            dispatch(addCategory(values));
            formik.resetForm();
            setTimeout(() => {
            navigate('/dashboard/admin/list-category')
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
                    <h3 className='mb-4 title'>{id !== undefined ? "Update":"Add"} Category</h3>
                    <div className="">
                        <form action="" onSubmit={formik.handleSubmit}>
                            <CustomInput 
                                type ="text" 
                                placeholder ="Enter title"
                                onChange={formik.handleChange("title")}
                                onBlur={formik.handleBlur("title")}
                                values={formik.values.title}
                                />
                            <div className="error">
                                {formik.touched.title && formik.errors.title}
                            </div>
                            <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
                                {id !== undefined ? "Update":"Add"} Category
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}
