import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import {toast} from "react-toastify"
const getTokenFromLocalStorage = sessionStorage.getItem('user') 
    ? JSON.parse(sessionStorage.getItem('user')) 
    : null


export const register = createAsyncThunk("auth/register",async(userData,thunkApi)=>{
    try{
        return await authService.registerUser(userData)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const login = createAsyncThunk("auth/login",async(userData,thunkApi)=>{
    try{
        return await authService.loginUser(userData)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getAllUsers = createAsyncThunk("auth/get-all-user",async(thunkApi)=>{
    try{
        return await authService.allUser()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})
export const getUser = createAsyncThunk("auth/get-user",async(id,thunkApi)=>{
    try{
        return await authService.getUser(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})
export const udUser = createAsyncThunk("auth/update-users",async(data,thunkApi)=>{
    try{
        return await authService.updateUs(data)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})
export const edUser = createAsyncThunk("auth/edit-users",async(data,thunkApi)=>{
    try{
        return await authService.editUs(data)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const deleteUs = createAsyncThunk("auth/delete-user",async(id,thunkApi)=>{
    try{
        return await authService.deleteus(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})



export const cart = createAsyncThunk("auth/add-cart",async(cartData,thunkApi)=>{
    try{
        return await authService.addToCart(cartData)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getCart = createAsyncThunk("auth/get-cart",async(cartData,thunkApi)=>{
    try{
        return await authService.getCart(cartData)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})


export const getOrder = createAsyncThunk('auth/all-order',async(thunkAPI)=>{
    try {
        return await authService.getOrder() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deletePrCart = createAsyncThunk("auth/delete-cart",async(cartItemId,thunkApi)=>{
    try{
        return await authService.removeProductCart(cartItemId)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const updateQuantity = createAsyncThunk("auth/update-cart",async(cartDetail,thunkApi)=>{
    try{
        return await authService.updateProductCart(cartDetail)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const emptycart = createAsyncThunk("auth/empth-cart",async(thunkApi)=>{
    try{
        return await authService.empty()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})
export const getMyorder = createAsyncThunk("auth/get-my-order",async(thunkApi)=>{
    try{
        return await authService.getMyOrder()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");

const initialState = {
    user : getTokenFromLocalStorage,
    udUse:"",
    auser:"",
    allUser:"",
    loginUser:"",
    orders :"",
    ToCart:"",
    myOrder:"",
    ed:"",
    delCart:"",
    udCart:"",
    empt:"",
    cartUser:[],
    isError:false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const authSlice = createSlice({
    name : "auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user=action.payload
            if(state.isSuccess == true){
                toast.info("User create success")
            }
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
            if(state.isError == true){
                toast.error(action.payload)
            }
        })

        builder.addCase(login.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loginUser=action.payload
            if(state.isSuccess == true){
                toast.info("Login success")
                sessionStorage.setItem('user',JSON.stringify(action.payload))
                sessionStorage.setItem('token',JSON.stringify(action.payload.token))
                window.location.reload()
            }
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
            if(state.isError == true){
                toast.error("Đăng nhập thất bại")
            }
        })

        builder.addCase(getAllUsers.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.allUser=action.payload
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })


        builder.addCase(cart.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(cart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.ToCart=action.payload
            if(state.isSuccess){
                toast.success("Product added to cart")
            }
        })
        .addCase(cart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(getCart.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartUser=action.payload
        })
        .addCase(getCart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(deletePrCart.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deletePrCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.delCart=action.payload
            if(state.isSuccess === true){
                toast.success("Product deleted !")
            }
        })
        .addCase(deletePrCart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
            if(state.isError === true){
                toast.error("Something went wrong !")
            }
        })

        builder.addCase(updateQuantity.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(updateQuantity.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.udCart=action.payload
        })
        .addCase(updateQuantity.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })


        builder.addCase(getOrder.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getOrder.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.orders=action.payload
        })
        .addCase(getOrder.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })



        builder.addCase(deleteUs.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteUs.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.del=action.payload
        })
        .addCase(deleteUs.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(udUser.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(udUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.udUse=action.payload
        })
        .addCase(udUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(edUser.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(edUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user=action.payload
        })
        .addCase(edUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(getUser.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.auser=action.payload
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(emptycart.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(emptycart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.empt=action.payload
        })
        .addCase(emptycart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(getMyorder.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getMyorder.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.myOrder=action.payload
        })
        .addCase(getMyorder.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(resetState, () => initialState);

    }
})

export default authSlice.reducer