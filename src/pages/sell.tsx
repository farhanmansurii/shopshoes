/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Input, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { api } from '~/utils/api';

type Inputs = {
  name: string;
  description: string;
  price: number;
  image: string
};
type ImagePreviewProps = {
  image: string | undefined;
}

const ImagePreview = ({ image }: ImagePreviewProps) => {
  return image ? <img className='w-32' src={image} alt="Preview" /> : null;
};

export default function Sell() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ibwh28zw');
    data.append('cloud_name', 'ecommerceupload');

    fetch('https://api.cloudinary.com/v1_1/ecommerceupload/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data: { url?: string }) => {
        const imageUrl = data?.url;
        setImage(imageUrl)
      })
      .catch((err: Error) => console.log(err));
  };
  const onSubmit = async (data: Inputs) => {
    try {
      const price = Number(data.price);
      const response = await hello.mutateAsync({
        ...data,
        price,
        image: image || '',
      });
      console.log('Item created successfully:', response);
    } catch (err) {
      console.log('Failed to create item:', err);
    }
  };

  const hello = api.listings.create.useMutation();
  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div className='pt-[6rem] flex items-center flex-col justify-center min-h-screen'>
      <div className='text-2xl font-semibold my-3'>Sell Any Product</div>
      <form className='flex flex-col lg:w-7/12 w-10/12 gap-5 mb-10' onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name', { required: true })} label='Item Name' placeholder='Give the Items Name' />
        <Textarea {...register('description', { required: true })} label='Item Description' placeholder='Give the Items Description' />
        <Input {...register('price', { required: true })} label='Item Price' placeholder='Give the Items Price' type='number' />
        <label htmlFor='image'>Image</label>
        <input type='file' id='image' onChange={handleImageChange} />
        <ImagePreview image={image} />

        <Button shadow color={'error'} type='submit' disabled={!isFormValid || !image}>Submit</Button>
      </form>
    </div>
  );
}
