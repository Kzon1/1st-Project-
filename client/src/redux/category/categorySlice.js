import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import categorySevice from './categorySevice'


// POST 
export const addCategory = createAsyncThunk('category/add-category',async(data,thunkAPI)=>{
    try {
        return await categorySevice.addCategory(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


// PUT 
export const updateCategory = createAsyncThunk('category/update-category',async(data,thunkAPI)=>{
    try {
        return await categorySevice.updateCategory(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// GET
export const getAllCategory = createAsyncThunk('category/get-all-category',async(thunkAPI)=>{
    try {
        return await categorySevice.getAllCategory()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getCategory = createAsyncThunk('category/get-category',async(id,thunkAPI)=>{
    try {
        return await categorySevice.getCategory(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// DELETE
export const deleteCategory = createAsyncThunk('category/delete-category',async(id,thunkAPI)=>{
    try {
        return await categorySevice.deleteCategory(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

//  RESET
export const resetState = createAction("Reset_all");


const initialState = {
    categories:[],
    getCategory:{},
    AllCate:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}


export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        // POST
        builder.addCase(addCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "add category successfully"
        })
        .addCase(addCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // PUT
        builder.addCase(updateCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "update category successfully"
        })
        .addCase(updateCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // GET
        builder.addCase(getAllCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.AllCate = action.payload
            state.message = "Get all category successfully"
        })
        .addCase(getAllCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.AllCate = null
            state.message = action.error
        })

        builder.addCase(getCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.getCategory = action.payload
            state.message = "Get category successfully"
        })
        .addCase(getCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.getCategory = null
            state.message = action.error
        })
    
    
        // DELETE
        // POST
        builder.addCase(deleteCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "delete category successfully"
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
    }
})
export default categorySlice.reducer
