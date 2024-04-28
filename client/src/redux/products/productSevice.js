import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig"

// POST
const addProducts = async(data)=>{
    const res = await axios.post(`${base_url}products/add-product`,data,config)
    return res.data
}
// PUT
const updateProduct = async(data)=>{
    const res = await axios.put(`${base_url}products/update-product/${data._id}`,data.data,config)
    return res.data
}
// GET
const getProducts = async()=>{
    const res = await axios.get(`${base_url}products/all-product`)
    return res.data
}
const getSingleProduct = async(id)=>{
    const res = await axios.get(`${base_url}products/get-product/${id}`)
    return res.data
}
const getListPr = async(page)=>{
    const res = await axios.get(`${base_url}products/product-list/${page}`)
    return res.data
}
const getCountTotal = async()=>{
    const res = await axios.get(`${base_url}products/product-count`)
    return res.data
}

const search = async(data)=>{
    const res = await axios.get(`${base_url}products/search/${data}`)
    return res.data
}

// DELETE
const deleteProduct = async(id)=>{
    const res = await axios.delete(`${base_url}products/delete-product/${id}`,config)
    return res.data
}
const productSevice = {
    getProducts,addProducts,deleteProduct,getSingleProduct,
    updateProduct,getListPr,getCountTotal,search
}

export default productSevice