import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import { OpenRoutes } from './routing/OpenRoutes';
import { PrivateRoutes } from './routing/PrivateRoutes';
import AdminDashboard from './pages/AdminDashboard';
import ListUsers from './pages/ListUser';
import AddUser from './pages/AddUser';
import ListCategory from './pages/ListCategory';
import AddCategory from './pages/AddCategory';
import AddProduct from './pages/AddProduct';
import ListProduct from './pages/ListProduct';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Category from './pages/Category';
import Order from './pages/Order';
import UserDashbboard from './pages/UserDashboard';
import MyOrder from './pages/MyOrder';
import UpdateUser from './pages/UpdateUser';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import About from './pages/About';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/> }>
            <Route index element={<HomePage/>}/>
            <Route path='category/:id' element={<Category/>}/>
            <Route path='login' element={<OpenRoutes><Login/></OpenRoutes>}/>
            <Route path='about' element={<><About/></>}/>
            <Route path='policy' element={<><Policy/></>}/>
            <Route path='contact' element={<><Contact/></>}/>
            <Route path='register' element={<OpenRoutes><Register/></OpenRoutes>}/>
            <Route path='cart' element={<PrivateRoutes><Cart/></PrivateRoutes>}/>
            <Route path='checkout' element={<PrivateRoutes><Checkout/></PrivateRoutes>}/>
            <Route path='checkout-success' element={<PrivateRoutes><CheckoutSuccess/></PrivateRoutes>}/>
            <Route path='product/:id' element={<ProductDetails/>}/>
            <Route path='dashboard/user' element={<PrivateRoutes><UserDashbboard/></PrivateRoutes>}/>
            <Route path='/dashboard/user/profile' element={<PrivateRoutes><UpdateUser/></PrivateRoutes>}/>
            <Route path='/dashboard/user/order' element={<PrivateRoutes><MyOrder/></PrivateRoutes>}/>
            <Route path='dashboard/admin' element={<PrivateRoutes><AdminDashboard/></PrivateRoutes>}/>
            <Route path='dashboard/admin/list-users' element={<PrivateRoutes><ListUsers/></PrivateRoutes>}/>
            <Route path='dashboard/admin/add-user' element={<PrivateRoutes><AddUser/></PrivateRoutes>}/>
            <Route path='dashboard/admin/update-user/:id' element={<PrivateRoutes><AddUser/></PrivateRoutes>}/>
            <Route path='dashboard/admin/add-category' element={<PrivateRoutes><AddCategory/></PrivateRoutes>}/>
            <Route path='dashboard/admin/list-category' element={<PrivateRoutes><ListCategory/></PrivateRoutes>}/>
            <Route path='dashboard/admin/update-category/:id' element={<PrivateRoutes><AddCategory/></PrivateRoutes>}/>
            <Route path='dashboard/admin/add-product' element={<PrivateRoutes><AddProduct/></PrivateRoutes>}/>
            <Route path='dashboard/admin/list-products' element={<PrivateRoutes><ListProduct/></PrivateRoutes>}/>
            <Route path='dashboard/admin/update-product/:id' element={<PrivateRoutes><AddProduct/></PrivateRoutes>}/>
            <Route path='dashboard/admin/order' element={<PrivateRoutes><Order/></PrivateRoutes>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
