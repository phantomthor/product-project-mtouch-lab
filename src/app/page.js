'use client'

import Pagination from '@/components/Pagination'
import usePagination from '@/hooks/usePagination'
import useSearch from '@/hooks/useSearch'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'



const comparingFuncs = {
  name: (a, b) => a.title > b.title ? 1 : b.title > a.title ? -1 : 0,
  price: (a, b) => a.price - b.price
};


const Homepage = () => {
  const [products, setProducts] = useState([])
  const [sortingAlgo, setSortingAlgo] = useState('name')
  const [searchString, setSearchString] = useState("");

  const matchingList = useSearch(searchString, products, "title");
  const [sortedList, setSortedList] = useState(null)

  const {
    items,
    numPages,
    currentPageIndex,
    setCurrentPageIndex,
  } = usePagination(sortedList, 10);

  useEffect(() => {
    setSortedList(matchingList.sort(comparingFuncs[sortingAlgo]))
  }, [matchingList, sortingAlgo])

  const router = useRouter()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const req = await fetch('https://fakestoreapi.com/products')
        const res = await req.json()
        if (res) {
          setProducts(res)
        }
      } catch (e) {
        alert(e)
      }
    }
    fetchData()
  }, [])



  const handleSort = (e) => {
    setSortingAlgo(e.target.id)
  }

  return (
    <div className='p-2 overflow-hidden'>
      <h1 className='font-bold text-3xl'>
        Products
      </h1>
      <div className='mt-4 flex flex-col lg:flex-row gap-4'>
        {/* filters */}
        <div className='w-full md:w-72 lg:w-96 shrink-0 mt-4'>
          <input className='border rounded-md w-full py-2 px-4' placeholder='Search the store' type="search" onChange={({ target: { value } }) => {
            setSearchString(value)
          }} />
          <p>Sort Products: </p>
          <div className='flex md:flex-col gap-2'>
            <label htmlFor="name" className='flex items-center gap-2'>
              <input type="radio" onChange={handleSort} name="sort" id='name' />
              <span>Name</span>
            </label>
            <label htmlFor="price" className='flex items-center gap-2'>
              <input type="radio" onChange={handleSort} name="sort" id='price' />
              <span>Price</span>
            </label>
          </div>
        </div>
        <div className='mt-4'>
          <div className='grid grow gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
            {
              items?.length ? items.sort(comparingFuncs[sortingAlgo]).map((product) => {
                return <div key={product?.id} onClick={() => {
                  router.push(`/${product.id}`)
                }} className='rounded-md hover:shadow-md cursor-pointer hover:scale-105 transition p-4 border flex justify-between relative flex-col'>
                  <Image alt={product.title} height={90} width={60} className='w-full' src={product.image} />
                  <div>
                    <p className='text-sm mt-2 truncate'>
                      {product.title}
                    </p>
                    <p className='truncate text-gray-600 text-xs'>{product.description}</p>
                  </div>
                  <p className='absolute top-0 left-0 bg-white px-4 py-2 rounded-xl'>₹{product.price}</p>
                </div>
              }) : <p>No data found. try modifying your search.</p>
            }
          </div>
          <Pagination currentIndex={currentPageIndex} setCurrentIndex={setCurrentPageIndex} totalPages={numPages} />
        </div>
      </div>
    </div>
  )
}

export default Homepage