import React, { useEffect } from 'react'
import {  Table } from 'antd';
import UserMenu from '../components/UserMenu'
import { useDispatch, useSelector } from 'react-redux';
import { getMyorder } from '../redux/user/userSlice';
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
    title: 'Total Deposit',
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
export default function MyOrder() {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getMyorder())
    },[])
    
    const orderState = useSelector(state=>state?.auth?.myOrder?.orders)


    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i+1,
            user: (
                <div>
                    <p>Name : {orderState[i]?.shippingInfo?.name}</p>
                    {/* <p>Phone Number : {orderState[i]?.user?.mobile}</p> */}
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
                                    
            totalprice: orderState[i]?.totalPrice,
            status: orderState[i]?.orderStatus === "COMPLETED" ? 
                (<p className='mb-0'>Deposit has been paid</p>) :(<p></p>),
                action : (
                  <div>
                      <p>
                          {orderState[i]?.status}
                      </p>
                  </div>
              )
            });
    
    }
  return (
    <div className='container-fluid ' style={{minHeight:"100vh",paddingTop:"100px"}}>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>
                    List My Orders
                </h1>
                <div className="">
                    <Table className='d-flex flex-column gap-3' columns={columns} dataSource={data1} />
                </div>
            </div>
        </div>
    </div>
  )
}
