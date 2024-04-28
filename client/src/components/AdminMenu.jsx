import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className='text-center' >
                <div className="list-group">
                    <h4>
                        Admin
                    </h4>
                    <NavLink to="/dashboard/admin/add-category" className="list-group-item list-group-item-action">Create Category</NavLink>
                    <NavLink to="/dashboard/admin/list-category" className="list-group-item list-group-item-action">List Category</NavLink>
                    
                    <NavLink to="/dashboard/admin/add-product" className="list-group-item list-group-item-action">Create Product</NavLink>
                    <NavLink to="/dashboard/admin/list-products" className="list-group-item list-group-item-action">List Product</NavLink>
                    
                    <NavLink to="/dashboard/admin/add-user" className="list-group-item list-group-item-action">Create User</NavLink>
                    <NavLink to="/dashboard/admin/list-users" className="list-group-item list-group-item-action">List Users</NavLink>
                    <NavLink to="/dashboard/admin/order" className="list-group-item list-group-item-action">Orders</NavLink>
                </div>
            </div>
        </>
    );
}

export default AdminMenu;
