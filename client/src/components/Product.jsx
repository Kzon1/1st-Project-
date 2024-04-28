import React from 'react'
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { cart } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

export default function Product({item}) {
  const dispatch = useDispatch()
  const user = useSelector(state=>state?.auth?.user)
  return (
    <div className='p-2 m-4' style={{border:"1px solid #ccc",borderRadius:"20px",width:"356px"}}>
      <div>
        <img width={339} height={170} style={{borderRadius:"20px"}} src={item?.images[0]?.url}/>
      </div>
      <div className='p-2' style={{height:"150px"}}>
        <p className='mb-2'>{item?.title}</p>
        <p className='mb-2'>Price : {item?.price}</p>
        <p className='mb-2'>Category : {item?.category}</p>
      </div>
      <div className='p-2 d-flex align-items-center justify-content-between'>
        <button className='btn btn-warning'>
          <Link to={`/product/${item?._id}`} className='text-black text-decoration-none'>
            More Details
          </Link>
        </button>
        <button className='btn btn-primary'
          onClick={()=>{
            if(user!== null){
              dispatch(cart({productId:item?._id,quantity:1,price:item?.price}))
            }else{
              toast.warn("Please Login")
            }
          }}
        >Add To Cart</button>
      </div>
    </div>
  )
}
