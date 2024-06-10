'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useQueryClient } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import FileUploader from '../components/FileUploader';
import { createProduct } from '../api/services/productsServices';

const PostProductForm = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const queryClient = useQueryClient();

    const handleFileUpload = (urls: string[]) => {
        setFileUrls(urls);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const product = {
                title,
                price: parseFloat(price),
                category,
                description,
                images: fileUrls,
            };
            const response = await createProduct(product);
            toast('Product is created!');
            await queryClient.invalidateQueries('products');
            console.log(response);
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } catch (error) {
            if (error instanceof Error) toast.error("Failed to add product: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto p-6 bg-white shadow-lg">
                <h1 className="text-xl font-semibold mb-4">Создать объявление</h1>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Укажите Название*</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black
                            shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Например, TuF Dash F15"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Укажите Цену*</label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Введите цену"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Категория*</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Введите категорию"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Фото</label>
                        <FileUploader onFileUpload={handleFileUpload} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Описание*</label>
                        <textarea
                            rows={8}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Опишите ваш товар"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default PostProductForm;
