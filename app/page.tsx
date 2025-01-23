"use client";
import React, { useEffect, useState } from 'react';
import Top_Head from './multiy-components/headers/top-header';
import Header from './multiy-components/headers/header';
import Hero from './multiy-components/home/hero-section';
import Editers from './multiy-components/home/editers';
import Our_Product from './multiy-components/home/our-product';
import ClassicSection from './multiy-components/home/clasic-product';
import Neural from './multiy-components/home/neural';
import CenteredDetails from './multiy-components/home/furture-post';
import { sanityFetch } from '@/sanity/lib/fetch';
import { allProducts } from '@/sanity/lib/querry';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function Home () {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchproduct() {
     const fetchedProduct : Product[] = await client.fetch(allProducts)
      setProduct(fetchedProduct)
    }
    fetchproduct()
  },[])

  return (
    <div>
      <Top_Head />
      <Header />
      <Hero />
      <Editers />
      <Our_Product />
      <ClassicSection />
      <Neural />
      <CenteredDetails />
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Fetched Product From Sanity</h1>
      <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center flex-justify-center'>
       {product.map((product) => (
        <div key={product._id}
        className='border rounded-lg shadow-md p-4 '>
          <h2 className='text-lg font-semibold mb-4 text-center'>{product.title}</h2>
          <Link href={`/product/${product.slug.current}`}>
          {product.productImage && (
            <Image 
            src={urlFor(product.productImage).url()}
            alt='image'
            width={400}
            height={400}
            className='w-full h-48 object-cover rounded-md'/>
          )}
          <p className='text-gray-950 mt-2 text-center'>{'Price : '}${product.price}</p>
          </Link>
          {/* <p className='text-gray-950 mt-3'>{product.description}</p> */}
          <Button className='bg-blue-500 w-full p-4 text-center items-center hover:bg-green-600'>Add to cart</Button>
        </div>
       ))}
      </div>
    </div>
    </div>
  )
}
