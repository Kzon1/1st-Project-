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
                    <p>Tên : {orderState[i]?.user?.name}</p>
                    <p>Số điện thoại : {orderState[i]?.user?.mobile}</p>
                    <p>Địa chỉ : {orderState[i]?.shippingInfo?.address}</p>
                    <p>Quốc gia : {orderState[i]?.shippingInfo?.country}</p>
                </div>
            ),
            products: (
                    orderState[i]?.orderItems && orderState[i]?.orderItems?.map((e,index)=>(
                    <div key={index} className='mb-4'>
                        <p>Tên sản phẩm : {e?.productId?.title}</p>
                        <p>Số lượng đặt hàng : {e?.quantity}</p>
                        <p>Giá : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price)}                                                                                                                                                        
                        </p>
                    </div>
                    ))
            ),
                                    
            totalprice: orderState[i]?.totalPrice,
            status: orderState[i]?.orderStatus === "COMPLETED" ? 
                (<p className='mb-0'>Đã thanh toán</p>) :(<p>Thanh toán khi nhận hành</p>),
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
