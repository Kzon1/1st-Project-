import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import Container from '../components/Container';
import {useDispatch,useSelector} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Paypal from '../components/Paypal';
const Checkout = () => {
    const dispatch = useDispatch()
    const cartState = useSelector(state=>state.auth?.cartUser)
    const [totalAmount,setTotalAmount]=useState(null)
    const [totalDeposit,setTotalDeposit] = useState(null)
    const [shippingInfo,setShippingInfo] = useState(null) 
    const [touch,setTouch] = useState(false) 
    useEffect(()=>{
        let sum = 0
        for(let i = 0;i < cartState?.length ;i++){
            sum += (Number(cartState[i]?.quantity * cartState[i]?.price))
            setTotalAmount(sum)
            setTotalDeposit(sum * 0.25);
        }
    
    },[cartState])
    console.log(shippingInfo)

    let userSchema = Yup.object().shape({
        name: Yup.string().required('name is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        address: Yup.string().required('address is Required'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        country: Yup.string().required('country is Required'),
        city: Yup.string().required('city is Required'),
        pincode: Yup.string().required('pincode is Required'),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            address:"",
            country:"",
            pincode:"",
            city:"",
        },
        validationSchema:userSchema,
        onSubmit: values => {
            // dispatch(login(values))
            setShippingInfo(values)
            // alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <Container class1="checkout-wrapper home-wrapper-2 py-5">
                <div className="row pt-5" style={{minHeight:"90vh"}}>
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h4 className="title total">Contact Information</h4>
                            <p className="user-details total">Teamdev( Pastover143@gmail.com )</p>
                            <h4 className='mb-3'>Shipping Address</h4>
                            <form onSubmit={formik.handleSubmit} className='d-flex gap-15 flex-wrap justify-content-between' action="">
                                <div className="w-100">
                                    <select 
                                        className='form-control form-select' 
                                        name="country" id=""
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                        value={formik.values.country}
                                        >
                                        
                                        <option value="" selected disabled>
                                            Select Country  
                                        </option>
                                        <option value="Việt Nam">
                                            Việt Nam 
                                        </option>
                                        <option value="Hàn Quốc">
                                            Hàn Quốc 
                                        </option>
                                        <option value="Pháp">
                                            Pháp   
                                        </option>
                                        <option value="Nhật Bản">
                                            Nhật Bản 
                                        </option>
                                    </select>
                                    <div className="error">
                                        {formik.touched.country && formik.errors.country ? (
                                            <div>{formik.errors.country}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input 
                                        type="text" 
                                        placeholder='Name ...' 
                                        name="" 
                                        className='form-control' 
                                        id="" 
                                        onChange={formik.handleChange("name")}
                                        onBlur={formik.handleBlur("name")}
                                        value={formik.values.name}
                                        />
                                    <div className="error">
                                        {formik.touched.name && formik.errors.name ? (
                                            <div>{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                </div>
                                
                                <div className="w-100">
                                    <input 
                                        type="text" name="" 
                                        placeholder='Address' 
                                        className='form-control' 
                                        id="" 
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                        value={formik.values.address}
                                        />
                                    <div className="error">
                                        {formik.touched.address && formik.errors.address ? (
                                            <div>{formik.errors.address}</div>
                                        ) : null}
                                    </div>
                                </div>
                               
                                <div className="flex-grow-1">
                                    <input 
                                        type="text" 
                                        name="" 
                                        placeholder='City' 
                                        className='form-control' 
                                        id="" 
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                        value={formik.values.city}
                                        />
                                    <div className="error">
                                        {formik.touched.city && formik.errors.city ? (
                                            <div>{formik.errors.city}</div>
                                        ) : null}
                                    </div>
                                </div>
                                
                                <div className="flex-grow-1">
                                    <input 
                                        type="text" 
                                        name=""
                                        placeholder='Zipcode' 
                                        className='form-control'
                                        id=""
                                        onChange={formik.handleChange("pincode")}
                                        onBlur={formik.handleBlur("pincode")}
                                        value={formik.values.pincode}
                                        />
                                    <div className="error">
                                        {formik.touched.pincode && formik.errors.pincode ? (
                                            <div>{formik.errors.pincode}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex mb-4 align-items-center justify-content-between">
                                        <Link className='text-dark' to='/cart'><IoMdArrowBack className='me-2'/>
                                        Return To Cart
                                        </Link>
                                        
                                        <button className='btn btn-primary' type="submit" onClick={()=>{
                                            setTouch(true)
                                        }}>Deposit</button>
                                    </div>
                                    {
                                        touch==true&& (
                                            <div className='mt-4'>
                                                <Paypal amount={totalDeposit+500} payload={{
                                                shippingInfo:shippingInfo,
                                                orderItems:cartState,totalPrice:totalDeposit+500}}/>
                                            </div>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {
                                cartState && cartState?.map((e,index)=>(
                                    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                                        <div className="w-75 d-flex align-items-center gap-15">
                                            <div className="w-30 position-relative me-4">
                                                <span style={{top:"-10px",right:"-5px",padding:"6px 9px"}} 
                                                className='badge bg-secondary position-absolute text-white rounded-circle'>
                                                    {e?.quantity ? e?.quantity : 0}
                                                </span>
                                                <img className='img-fluid' 
                                                    width={80} src={e?.productId?.images[0]?.url} 
                                                    alt="Product" />
                                            </div>
                                            <div className="w-50">
                                                <h6 className="total-price" style={{fontSize:"13px"}}>{e?.productId?.title}</h6>
                                                <p className="total-price">{e?.productId?.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 w-20">
                                            <h5  className='total'>$ {e?.productId?.price * e?.quantity}</h5>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='total'>SubTotal:</p>
                                <p className='total-price'>$ {totalAmount ? totalAmount : 0}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='mb-0 total'>Shipping:</p>
                                <p className='mb-0 total-price'>$ 500</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className='total'>Total:</h4>
                            <h5 className='total-price'>$ { totalAmount ? totalAmount + 5: 0}</h5>
                        </div> 
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className='total'>Total Deposit:</h4>
                            <h5 className='total-deposit'>$ { totalDeposit ? totalDeposit :0}</h5>
                        </div> 
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Checkout;
