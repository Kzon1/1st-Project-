import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProducts, getSingleProduct } from '../redux/products/productSlice'
import ProductDescription from '../components/ProductDescription'
import Product from '../components/Product'
import { toast } from 'react-toastify'
import { cart } from '../redux/user/userSlice'

export default function ProductDetails() {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(()=>{
        dispatch(getSingleProduct(id))
        dispatch(getProducts())
    },[id])
    useEffect(()=>{
        window.scroll(0,0)
    },[id])
    const user = useSelector(state=>state?.auth?.user)
    const product = useSelector(state=>state.product?.getproduct?.findProduct)
    const allProduct = useSelector(state=>state.product?.products)
    const pr = allProduct?.filter(item=>item?.category === product?.category && item?._id !== product?._id)
    return (
        <div style={{minHeight:"100vh",paddingTop:"100px"}}>
            <div className="container p-4">
                <div className="row">
                    <div className="col-4">
                        <img width="100%" src={product?.images[0]?.url} alt="" />
                    </div>
                    <div className="col-8">
                        <h1>Product Details</h1>
                        <div>
                            <p> <strong>Name : </strong> {product?.title}</p>
                            <p><strong>Description : </strong> <ProductDescription description={product?.description} />
                            </p>
                            <p><strong>Price : </strong> {product?.price}</p>
                            <p><strong>Category : </strong> {product?.category}</p>
                        </div>
                        <button className='btn btn-success mt-4 w-100'
                            onClick={()=>{
                                if(user!== null){
                                    dispatch(cart({productId:product?._id,quantity:1,price:product?.price}))
                                }else{
                                    toast.warn("Please Login")
                                }
                            }}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
                <div className="row mt-4" style={{borderTop:"1px solid #ccc"}}>
                    <h1 className='mt-4 mb-4'>
                        Similar Products ➡️
                    </h1>
                    <div className='d-flex flex-wrap'>
                        {
                            pr?.length > 0 ? pr?.map((e,index)=>(
                                <Product key={index} item={e}/>
                            )) : (
                                <h4 className='text-center'>Empty similar products</h4>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
