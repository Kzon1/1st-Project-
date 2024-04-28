import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import productSevice from './productSevice'


// POST
export const addProduct = createAsyncThunk('product/add-product',async(data,thunkAPI)=>{
    try {
        return await productSevice.addProducts(data) 
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})


// PUT
export const updateProduct = createAsyncThunk('product/update-product',async(data,thunkAPI)=>{
    try {
        return await productSevice.updateProduct(data) 
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})

// GET
export const getProducts = createAsyncThunk('product/get-all-product',async(thunkAPI)=>{
    try {
        return await productSevice.getProducts() 
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})
export const getListProducts = createAsyncThunk('product/get-list-product',async(page,thunkAPI)=>{
    try {
        return await productSevice.getListPr(page) 
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})
export const getSingleProduct = createAsyncThunk('product/get-product',async(id,thunkAPI)=>{
    try {
        return await productSevice.getSingleProduct(id) 
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})
export const getTotal = createAsyncThunk('product/get-total',async(thunkAPI)=>{
    try {
        return await productSevice.getCountTotal() 
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})
export const searchPro = createAsyncThunk('product/search-total',async(data,thunkAPI)=>{
    try {
        return await productSevice.search(data) 
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})

// DELETE
export const deleteProducts = createAsyncThunk('product/delete-product',async(id,thunkAPI)=>{
    try {
        return await productSevice.deleteProduct(id) 
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");


const initialState = {
    products :[],
    getproduct:{},
    total:"",
    search:"",
    listPrd:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const productSlice = createSlice({
    name : "product",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        // POST
        builder.addCase(addProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "add products successfully"
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // PUT
        builder.addCase(updateProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "update products successfully"
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // GET
        builder.addCase(getProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all products successfully"
            state.products = action.payload
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            state.products = null
        })

        builder.addCase(getTotal.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getTotal.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all products successfully"
            state.total = action.payload
        })
        .addCase(getTotal.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            state.total = null
        })

        builder.addCase(searchPro.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(searchPro.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all products successfully"
            state.search = action.payload
        })
        .addCase(searchPro.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            state.search = null
        })

        builder.addCase(getListProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getListProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all products successfully"
            state.listPrd = action.payload
        })
        .addCase(getListProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            state.listPrd = null
        })

        builder.addCase(getSingleProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get product successfully"
            state.getproduct = action.payload
        })
        .addCase(getSingleProduct.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            state.getproduct = null
        })


        // DELETE
        builder.addCase(deleteProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "delete products successfully"
        })
        .addCase(deleteProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        
        .addCase(resetState, () => initialState);
    }
})

export default productSlice.reducer