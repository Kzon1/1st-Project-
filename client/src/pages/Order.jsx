import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {  Table } from 'antd';
import AdminMenu from '../components/AdminMenu';
import {useDispatch, useSelector} from 'react-redux'
import {  getOrder } from '../redux/user/userSlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { updateOrder } from '../redux/order/orderSlice';
import { toast } from 'react-toastify';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'User',
    dataIndex: 'user',
    sorter :(a,b)=>a.title.length - b.title.length
  },
  {
    title: 'Products',
    dataIndex: 'products',
  },
  {
    title: 'Total Price',
    dataIndex: 'totalprice',
  },
  {
    title:"Status",
    dataIndex: 'status',
  },
  {
    title:"Action",
    dataIndex: 'action',
  }
];

const Order = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getOrder())
    },[])
    
    const orderState = useSelector(state=>state?.auth?.orders)
    
    const handleOnchangeOrder =  (id,e)=>{
      const data = {_id : id, status :e.target.value}
      dispatch(updateOrder(data))
      toast.success("Update order success !")
      setTimeout(() => {
        dispatch(getOrder())
      }, 300);
    }
    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i+1,
            user: (
                <div>
                    <p>Name : {orderState[i]?.user?.name}</p>
                    <p>Phone Number : {orderState[i]?.user?.mobile}</p>
                    <p>Andress : {orderState[i]?.shippingInfo?.address}</p>
                    <p>Country : {orderState[i]?.shippingInfo?.country}</p>
                </div>
            ),
            products: (
                    orderState[i]?.orderItems && orderState[i]?.orderItems?.map((e,index)=>(
                    <div key={index} className='mb-4'>
                        <p>Name : {e?.productId?.title}</p>
                        <p>Quantity : {e?.quantity}</p>
                        <p>Price : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format(e?.productId?.price)}                                                                                                                                                        
                        </p>
                    </div>
                    ))
            ),
                                    
            totalprice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format(orderState[i]?.totalPrice),
            status: orderState[i]?.orderStatus === "COMPLETED" ? 
                (<p className='mb-0'>Paid</p>) :(<p></p>) ,
            action: (
                    <>
                        <select 
                        name="" 
                        defaultValue={orderState[i]?.status} 
                        className='form-control form-select' 
                        id=""
                          onChange={(e)=>handleOnchangeOrder(orderState[i]?._id,e)}
                        >
                        <option value="Processing">Processing</option>
                        <option value="Preparing goods">Preparing goods</option>
                        <option value="Delivering">Delivering</option>
                        <option value="Successful delivery">Successful delivery</option>
                        </select>
                    </>
                ),
            });
    }
    return (
            <div className='container-fluid' style={{minHeight:"100vh",paddingTop:"100px"}}>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>
                            List Order
                        </h1>
                        <div className="">
                            <Table className='d-flex flex-column gap-3' columns={columns} dataSource={data1} />
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Order;
