import React from 'react';

const ProductDescription = ({ description }) => {
  return (
    <div className='description-product mt-2' style={{fontSize:"12px"}} dangerouslySetInnerHTML={{ __html: description }} />
  );
};

export default ProductDescription;
