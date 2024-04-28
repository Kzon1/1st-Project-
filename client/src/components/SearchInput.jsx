import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, searchPro } from "../redux/products/productSlice";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [toggle,setToggle] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state?.product?.products);

  useEffect(() => {
      dispatch(getProducts());
  }, []);

  const handleInputChange = (event) => {
      setToggle(true)
      setSearchQuery(event.target.value);
  };

  const filteredProducts = products?.filter(product =>
      product?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="position-relative"
    >
      <form
        className="d-flex search-form"
        role="search"
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-outline-success"
          type="button" // Change type to button
        >
          Search
        </button>
      <div className="position-absolute bg-white" style={{top:38,borderRadius:"10px",border:"1px solid #ccc"}}>
        {
          toggle && filteredProducts && filteredProducts?.map((e,index)=>(
            <Link to={`/product/${e?._id}`} style={{fontSize:"12px"}} 
              className="p-2 d-block text-decoration-none text-dark" key={index}
              onClick={()=>setToggle(false)}>
              <p className="mb-0">{e?.title}</p>
            </Link>
          ))
        }
      </div>
      </form>
    </div>
  );
};

export default SearchInput;
