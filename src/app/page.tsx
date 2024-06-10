'use client';

import React from 'react';
import { useProducts } from './api/services/productsServices';

export default function Home() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">Loading...</div>;
  if (error && error instanceof Error) return <div className="text-red-600 text-center py-8">An error occurred: {error.message}</div>;

  return (
      <section className="container mx-auto p-4 md:p-24 bg-white bg-custom-image bg-cover bg-center">
        <h1 className="text-center text-4xl font-bold text-black mg-4">VIP-объявления</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.map(product => (
                  <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                      <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />
                      <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-black">{product.title}</h3>
                          <p className="text-gray-500 mb-4">{product.category}</p>
                          <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-green-600">${product.price}</span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>
  );
};
