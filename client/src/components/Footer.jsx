import React from 'react';
import {Link} from 'react-router-dom'
const Footer = () => {
    return (
        <>
            <footer className='py-4 footer'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className='text-center mb-0 text-white'>
                                &copy;{new Date().getFullYear()} - Powered by Developer's Kzon 
                            </p>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <Link to='/about' className='m-4 mt-2 mb-2 text-decoration-none fs-6 text-white'>
                                About
                            </Link>
                            <Link to='/contact' className='m-4 mt-2 mb-2 text-decoration-none fs-6 text-white'>
                                Contact
                            </Link>
                            <Link to='/policy' className='m-4 mt-2 mb-2 text-decoration-none fs-6 text-white'>
                                Private Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
