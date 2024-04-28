import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {  Table } from 'antd';
import AdminMenu from '../components/AdminMenu';
import {useDispatch, useSelector} from 'react-redux'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomModel from '../components/CustomModel';
import { deleteCategory, getAllCategory } from '../redux/category/categorySlice';
import { deleteProducts, getProducts } from '../redux/products/productSlice';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'Image',
    dataIndex: 'image',
    render: (text, record) => (
      <div>
        {record?.image?.length > 0 && (
          <img
            key={record?.image[0]?._id}
            src={record?.image[0]?.url}
            alt={record?.title}
            style={{ width: '50px', height: 'auto', objectFit: 'cover', marginRight: '5px' }}
          />
        )}
      </div>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ListProduct = () => {
    
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setCategoryId(e)
    };
    const hideModal = () => {
        setOpen(false);
    };
    useEffect(()=>{
      dispatch(getProducts())
    },[])
    const deleteCate =(e)=>{
        dispatch(deleteProducts(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getProducts())
        }, 100);
    }
    const data1=[]
    const productState = useSelector(state=>state?.product?.products) // lấy từ redux 
    console.log(productState)
    for (let i = 0; i < productState?.length; i++) {
      if(productState[i].role !=="admin"){
        data1.push({
            key: i+1,
            title: productState[i]?.title,
            image:productState[i]?.images,
            price: productState[i]?.price,
            category: productState[i]?.category,
            action: (
              <>
                <Link to={`/dashboard/admin/update-product/${productState[i]?._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(productState[i]?._id)
                  }}
                  >
                  <MdDelete className='ms-3 fs-5 text-danger'/>
                </button>
              </>
            )
        });
      }
    }
    return (
            <div className='container-fluid' style={{minHeight:"100vh",paddingTop:"100px"}}>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>
                            List Category
                        </h1>
                        <div className="">
                            <Table  columns={columns} dataSource={data1} />
                        </div>
                        <CustomModel 
                            hideModal={hideModal} 
                            open={open} 
                            performAction={()=>{deleteCate(categoryId)}}
                            title="Are you sure you want to delete this category?" />
                    </div>
                </div>
            </div>
    );
}

export default ListProduct;
