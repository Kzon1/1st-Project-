import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig"


// POST 
// POST category
const addCategory =async (data)=>{
    const res = await axios.post(`${base_url}category/add-category`,data,config)
    return res.data
}


// PUT
// update category
const updateCategory =async (data)=>{
    const res = await axios.put(`${base_url}category/update-category/${data._id}`,data.data,config)
    return res.data
}


// GET 
// get all category
const getAllCategory =async ()=>{
    const res = await axios.get(`${base_url}category/all-category`)
    return res.data
}
const getCategory =async (id)=>{
    const res = await axios.get(`${base_url}category/get-category/${id}`)
    return res.data
}

// DELETE 
// DELETE category
const deleteCategory =async (id)=>{
    const res = await axios.delete(`${base_url}category/delete-category/${id}`,config)
    return res.data
}


const categoryService ={
    addCategory,getAllCategory,deleteCategory
    ,updateCategory,getCategory
}

export default categoryService