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
  return image ? <img src={image} alt="Preview" /> : null;
};

export default function Sell() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'medtsm1p');
    data.append('cloud_name', 'ecommerceupload');

    fetch('https://api.cloudinary.com/v1_1/ecommerceupload/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data: { url?: string }) => {
        const imageUrl = data?.url;
        console.log(imageUrl);
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

  return (
    <div className='pt-[6rem] flex items-center justify-center min-h-screen'>
      <form className='flex flex-col w-7/12 gap-5' onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name', { required: true })} label="Item Name" placeholder='Give the Items Name' />
        <Textarea {...register('description', { required: true })} label="Item Description" placeholder='Give the Items Description' />
        <Input {...register('price', { required: true })} label="Item Price" placeholder='Give the Items Price' type='number' />
        <label htmlFor="image">Image</label>
        <input type="file" id="image" onChange={handleImageChange} />
        <ImagePreview image={image} />
        <Button type='submit' >Submit</Button>
      </form>
    </div>
  );
}
