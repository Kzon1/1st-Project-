import axios from 'axios'
import { base_url } from '../../utils/base_url'
import {config} from '../../utils/axiosconfig'
const registerUser=async(userData)=>{
    const res = await axios.post(`${base_url}user/register`,userData)
    if(res.data){
        return res.data
    }
}

const loginUser=async(userData)=>{
    const res = await axios.post(`${base_url}user/login`,userData)
    if(res.data){
        return res.data
    }
}
const allUser=async()=>{
    const res = await axios.get(`${base_url}user/all-users`,)
    if(res.data){
        return res.data
    }
}
const getUser=async(id)=>{
    const res = await axios.get(`${base_url}user/get-user/${id}`,config)
    if(res.data){
        return res.data
    }
}
const updateUs=async(data)=>{
    const res = await axios.put(`${base_url}user/update-user/${data?._id}`,data.data,config)
    if(res.data){
        return res.data
    }
}
const editUs=async(data)=>{
    const res = await axios.put(`${base_url}user/edit-user/${data?._id}`,data?.data,config)
    if(res.data){
        return res.data
    }
}
const deleteus=async(id)=>{
    const res = await axios.delete(`${base_url}user/delete-user/${id}`,config)
    if(res.data){
        return res.data
    }
}

const addToCart=async(cartDate)=>{
    const res = await axios.post(`${base_url}user/add-cart`,cartDate,config)
    if(res.data){
        return res.data
    }
}


const getCart=async()=>{
    const res = await axios.get(`${base_url}user/get-cart`,config)
    if(res.data){
        return res.data
    }
}

const removeProductCart=async(cartItemId)=>{
    const res = await axios.delete(`${base_url}user/delete-cart/${cartItemId}`,config)
    if(res.data){
        return res.data
    }
}

const updateProductCart=async(cartDetail)=>{
    const res = await axios.put(`${base_url}user/update-cart/${cartDetail?.cartItemId}/${cartDetail?.productId}/${cartDetail?.newQuantity}`,null,config)
    if(res.data){
        return res.data
    }
}

const getOrder=async()=>{
    const res = await axios.get(`${base_url}user/get-all-order`,config)
    if(res.data){
        return res.data
    }
}
const getMyOrder=async()=> {
    const res = await axios.get(`${base_url}user/getmyorders`,config)
    if(res.data){
        return res.data
    }
}
const empty=async()=>{
    const res = await axios.delete(`${base_url}user/empty-cart`,config)
    return res.data
}
export const authService={
    registerUser,loginUser,allUser,deleteus,updateUs,getUser,addToCart,getCart,
    removeProductCart,updateProductCart,getOrder,empty,editUs,getMyOrder
}