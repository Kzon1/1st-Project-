import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { getAllCategory, resetState } from "../redux/category/categorySlice";
import { addProduct, getSingleProduct, updateProduct } from "../redux/products/productSlice";
import { delImg, uploadImg } from "../redux/upload/uploadSlice";
import AdminMenu from '../components/AdminMenu';

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  category: yup.string().required("Category is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllCategory());
    }, []);
    useEffect(() => {
        if (id !== undefined) {
            dispatch(getSingleProduct(id));
        } else {
            dispatch(resetState());
        }
    }, [id]);
    const pro = useSelector((state) => state?.product?.getproduct?.findProduct);
    const catState = useSelector((state) => state?.categories?.AllCate);
    const getACate = useSelector((state) => state?.categories?.AllCate);
    const imgState = useSelector((state) => state?.upload?.images);
    console.log(pro)
    const img = [];
    imgState.forEach((i) => {
        img.push({
        public_id: i.public_id,
        url: i.url,
        });
    });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(id !== undefined){
            const data = {_id : id,data : values}
            dispatch(updateProduct(data))
            toast.success("product Updated Successfullly!");
            navigate('/dashboard/admin/list-products')
            window.location.reload()
        }else{
            dispatch(addProduct(values));
            formik.resetForm();
            setTimeout(() => {
            navigate('/dashboard/admin/list-products')
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
                    <form
                onSubmit={formik.handleSubmit}
                className="d-flex gap-3 flex-column"
                >
                    <div className="form-floating mt-3">
                        <input 
                            value={formik.values.title} 
                            type="text"
                            className="form-control" 
                            name="title"
                            placeholder="Enter Product Title"
                            onChange={formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                            />
                        <label htmlFor="Enter Product Title">Enter Product Title</label>
                    </div>
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <div className="">
                        <ReactQuill
                        theme="snow"
                        name="description"
                        onChange={formik.handleChange("description")}
                        value={formik.values.description}
                        />
                    </div>
                <div className="error">
                    {formik.touched.description && formik.errors.description}
                </div>
                    <div className="form-floating mt-3">
                        <input 
                            value={formik.values.price} 
                            type="number"
                            className="form-control" 
                            name="price"
                            placeholder="Enter Product Price"
                            onChange={formik.handleChange("price")}
                            onBlur={formik.handleChange("price")}
                            />
                        <label htmlFor="Enter Product Price">Enter Product Price</label>
                    </div>
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
                    </div>
                    
                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="">Select Category</option>
                        {Array.isArray(catState) && catState.map((i, j) => {
                            return (
                                <option key={j} value={i?.title}>
                                    {i?.title}
                                </option>
                            )
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>

                
                    <div className="form-floating mt-3">
                        <input 
                            value={formik.values.quantity} 
                            type="number"
                            className="form-control" 
                            name="quantity"
                            placeholder="Enter Product Quantity"
                            onChange={formik.handleChange("quantity")}
                            onBlur={formik.handleBlur("quantity")}
                            />
                        <label htmlFor="Enter Product Quantity">Enter Product Quantity</label>
                    </div>
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <div className="bg-white border-1 p-5 text-center">
                        <Dropzone
                        onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                        >
                        {({ getRootProps, getInputProps }) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>
                                Drag 'n' drop some files here, or click to select files
                                </p>
                            </div>
                            </section>
                        )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                        return (
                            <div className=" position-relative" key={j}>
                            <button
                                type="button"
                                onClick={() => dispatch(delImg(i.public_id))}
                                className="btn-close position-absolute"
                                style={{ top: "10px", right: "10px" }}
                            ></button>
                            <img src={i.url} alt="" width={200} height={200} />
                            </div>
                        );
                        })}
                    </div>
                    <button
                        className="btn btn-primary border-0 rounded-3 my-5"
                        type="submit"
                    >
                        {id !== undefined ? "Update":"Add"} Product
                    </button>
                </form>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default AddProduct;