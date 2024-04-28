import React from 'react';
import { useSelector } from 'react-redux';
import UserMenu from '../components/UserMenu';

const UserDashbboard = () => {
    const CustomerUser = useSelector(state=>state?.auth?.user)

    return (
            <div className='container-fluid ' style={{minHeight:"100vh",paddingTop:"100px"}}>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu/>
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h1>User Name : {CustomerUser?.name}</h1>
                            <h1>User Email : {CustomerUser?.email}</h1>
                            <h1>User Contact : {CustomerUser?.mobile}</h1>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default UserDashbboard;
