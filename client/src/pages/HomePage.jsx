import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay } from 'swiper/modules';
import { Checkbox, Radio } from 'antd';
import { PriceData } from '../utils/PriceData';
import {useDispatch,useSelector} from 'react-redux'
import { getAllCategory } from '../redux/category/categorySlice';
import { getListProducts, getProducts, getTotal } from '../redux/products/productSlice';
import Product from '../components/Product';

const ListImgSlider = [
    {img : "https://scr.vn/wp-content/uploads/2020/07/T%E1%BA%A3i-h%C3%ACnh-%E1%BA%A3nh-si%C3%AAu-xe-HD-c%E1%BB%B1c-%C4%91%E1%BA%B9p-v%E1%BB%81-m%C3%A1y.jpg"},
    {img : "https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-si%C3%AAu-xe-Lamborghini-Full-HD.jpg"},
    {img : "https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-si%C3%AAu-xe-%C4%91%E1%BA%B9p-ch%E1%BA%A5t-l%C6%B0%E1%BB%A3ng-cao.jpg"},
    {img : "https://scr.vn/wp-content/uploads/2020/07/H%C3%ACnh-Si%C3%AAu-xe-Roll-Royce-4k-scaled.jpg"},
  ]
export default function HomePage() {
    const dispatch = useDispatch()
    const [radio,setRadio] = useState([])
    const [data,setData] = useState([])
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    useEffect(()=>{
        dispatch(getAllCategory())
        dispatch(getProducts())
        window.scroll(0,0)
    },[])
    

    const categories = useSelector(state=>state?.categories?.AllCate)
    const pro = useSelector(state=>state?.product?.products)

    
    
    console.log("dataa ", radio)
    useEffect(()=>{
        setData(pro?.filter(item=>item?.price < radio))
    },[radio])
    console.log(data)
    return (    
    <div style={{background:"#3c3c3c",paddingTop:"100px"}} className=''>
      <section className='pb-4'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-8">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Navigation,Autoplay]}
                        className="mySwiper"
                    >
                        {
                            ListImgSlider.map((e,index)=>(
                                <SwiperSlide key={index}>
                                    <img style={{borderRadius:"20px"}} width="100%" height="460" src={e.img} alt="sliderbar" />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className="col-4">
                    <div className="">
                        <div className="">
                            <img style={{borderRadius:"20px"}} width="100%" height="222" src="https://vanhoadoisong.vn/wp-content/uploads/2022/05/100-hinh-nen-anh-sieu-xe-dep-full-hd-cho-may-tinh-dien-thoai-01.jpg" alt="sliderbar" />
                        </div>
                        <div className="pt-3">
                            <img style={{borderRadius:"20px"}} width="100%" height="222" src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/6/10/738354/595097.jpg" alt="sliderbar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      <section className='text-white'>
        <div className='container row mt-3'>
                <div className='col-md-2'>
                    <h6 className='text-center mt-4'> 
                        Filter By Price
                    </h6>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={e=>setRadio(e.target.value)}>
                            {PriceData?.map(p=>(
                                <div  key={p?._id}>
                                    <Radio className='text-white' value={p.array}>
                                        {p?.name}
                                    </Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className='d-flex flex-column mt-4'>
                        <button className='btn btn-danger' onClick={()=>window.location.reload()}>
                            RESET FILTER
                        </button>
                    </div>
                </div>
                <div className='col-md-9 '>
                    <h1 className='text-center'>
                        All Products
                    </h1>
                    <div className='d-flex flex-wrap'>
                        {
                            data?.length > 0 ? (
                                data?.map((item,index)=>(
                                    <Product item={item} key={index}/>
                                ))):
                            (
                                pro?.map((item,index)=>(
                                    <Product item={item} key={index}/>
                                )))
                        }
                    </div>
                </div>
            </div>
      </section>
    </div>
  )
}
