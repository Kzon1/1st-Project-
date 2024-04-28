import React from 'react';
import AdminMenu from '../components/AdminMenu';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const CustomerUser = useSelector(state=>state?.auth?.user)

    return (
            <div className='container-fluid ' style={{minHeight:"100vh",paddingTop:"100px"}}>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h1>Admin Name : {CustomerUser?.name}</h1>
                            <h1>Admin Email : {CustomerUser?.email}</h1>
                            <h1>Admin Contact : {CustomerUser?.mobile}</h1>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default AdminDashboard;
