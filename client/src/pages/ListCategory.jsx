import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {  Table } from 'antd';
import AdminMenu from '../components/AdminMenu';
import {useDispatch, useSelector} from 'react-redux'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomModel from '../components/CustomModel';
import { deleteCategory, getAllCategory } from '../redux/category/categorySlice';

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
    title: 'Action',
    dataIndex: 'action',
  },
];

const ListCategory = () => {
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
      dispatch(getAllCategory())
    },[])
    const deleteCate =(e)=>{
        dispatch(deleteCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getAllCategory())
        }, 100);
    }
    const data1=[]
    const categoryState = useSelector(state=>state?.categories?.AllCate) // lấy từ redux 
    console.log(categoryState)
    for (let i = 0; i < categoryState?.length; i++) {
      if(categoryState[i].role !=="admin"){
        data1.push({
            key: i+1,
            title: categoryState[i].title,
            action: (
              <>
                <Link to={`/dashboard/admin/update-category/${categoryState[i]?._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(categoryState[i]._id)
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

export default ListCategory;
