import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {  Table } from 'antd';
import AdminMenu from '../components/AdminMenu';
import {useDispatch, useSelector} from 'react-redux'
import { deleteUs, getAllUsers } from '../redux/user/userSlice';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomModel from '../components/CustomModel';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder:"descend",
    sorter :(a,b)=>a.name.length - b.name.length
  },
  {
    title: 'email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ListUsers = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setUserId(e)
    };
    const hideModal = () => {
        setOpen(false);
    };
    useEffect(()=>{
      dispatch(getAllUsers())
    },[])
    const deleteUser =(e)=>{
        dispatch(deleteUs(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getAllUsers())
        }, 100);
    }
    const data1=[]
    const customerState = useSelector(state=>state.auth.allUser) // lấy từ redux 
    for (let i = 0; i < customerState.length; i++) {
      if(customerState[i].role !=="admin"){
        data1.push({
            key: i,
            name: customerState[i].name,
            email: customerState[i].email,
            mobile: customerState[i].mobile,
            address: customerState[i].address,
            action: (
              <>
                <Link to={`/dashboard/admin/update-user/${customerState[i]?._id}`}><FaEdit className='fs-5 text-secondary'/></Link>
                <button 
                  className='bg-transparent border-0'
                  onClick={()=>{
                    showModal(customerState[i]._id)
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
                            List Users
                        </h1>
                        <div className="">
                            <Table  columns={columns} dataSource={data1} />
                        </div>
                        <CustomModel 
                            hideModal={hideModal} 
                            open={open} 
                            performAction={()=>{deleteUser(userId)}}
                            title="Are you sure you want to delete this user?" />
                    </div>
                </div>
            </div>
    );
}

export default ListUsers;
