import React, { useState } from 'react'
import './Pagination.css'
import {
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
const Pagination = ({pageState}) => {
  const page = pageState.value;
  const setPage = pageState.set;
  return (
    <div className='pagination'>
      <button className='page-change' onClick={() => setPage((prevPage) => (prevPage > 1 ? (prevPage - 1) : prevPage))}>
        <FaChevronLeft />
      </button>
      <div className='page-count'>
        {page}
      </div>
      <button className='page-change' onClick={() => setPage((prevPage) => prevPage + 1)}>
        <FaChevronRight />
      </button>
    </div>
  )
}

export default Pagination