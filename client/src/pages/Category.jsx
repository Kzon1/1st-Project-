import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProducts } from '../redux/products/productSlice'
import { getCategory } from '../redux/category/categorySlice'
import Product from '../components/Product'

export default function Category() {
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{ 
        dispatch(getProducts())
        dispatch(getCategory(id))
    },[id])
    const products = useSelector(state=>state?.product?.products)
    const categories = useSelector(state=>state?.categories?.getCategory?.getCategory)
    const pr = products?.filter(item=>item?.category === categories?.title)
    console.log(pr)
  return (
    <div className='' style={{minHeight:"100vh",paddingTop:"100px"}}>
        <h1 className='text-center mt-4 mb-4'>CATEGORY - {categories?.title}</h1>
        <p className='text-center'>{pr?.length} result found</p>
        <div className="">
          <div className="d-flex flex-wrap">
            {
              pr && pr?.map((e,index)=>(
                <Product key={index} item={e}/>
              ))
            }
          </div>
        </div>
    </div>
  )
}
