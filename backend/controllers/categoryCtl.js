const categoryModel = require('../models/categoryModel.js')
const slugify = require('slugify')

const CreateCategory = async(req,res)=>{
    try {
        const {title} = req.body
        if(!title){
            return res.status(401).send({message : 'Name is required'})
        }
        const existingCategory = await categoryModel.findOne({title})
        if(existingCategory){
            return res.status(200).send({
                success : true ,
                message : 'Category Already Existits'
            })
        }
        const category = await new categoryModel({title , slug:slugify(title)}).save()
        res.status(201).send({
            success : true , 
            message : 'new category created',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create Category false!"
        })
    }
}

const getCategory = async(req,res)=>{
    const {_id}= req.params
    try {
        const getCategory = await categoryModel.findById(_id)
        res.status(200).send({
            success : true,
            message : "get Category successfully",
            getCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get Category false!"
        })
    }
}

const getAllCategory = async(req,res)=>{
    try {
        const getCategory = await categoryModel.find()
        res.json(getCategory)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all Category false!"
        })
    }
}

const updateCategory = async(req,res)=>{
    const {_id}= req.params
    try {
        const udCategory = await categoryModel.findByIdAndUpdate(_id,req.body,{new :true})
        res.status(200).send({
            success : true,
            message : "update Category successfully",
            udCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "update Category false!"
        })
    }
}


const deleteCategory = async(req,res)=>{
    const {_id}= req.params
    try {
        const delCategory = await categoryModel.findByIdAndDelete(_id)
        res.status(200).send({
            success : true,
            message : "delete Category successfully",
            delCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete Category false!"
        })
    }
}

module.exports = {CreateCategory,getAllCategory,getCategory,updateCategory,deleteCategory}