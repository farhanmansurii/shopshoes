/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import { Button, Input, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { api } from '~/utils/api';

type Inputs = {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  isOriginal: boolean;
  condition: string
  image?: string;
};
type ImagePreviewProps = {
  image: string;
}
const ImagePreview = ({ image }: ImagePreviewProps) => {
  return image ? <img className='w-32' src={image} alt="Preview" /> : null;
};


export default function Sell() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [image, setImage] = useState<string>('');
  const [size, setSize] = useState("");

  function generateShoeSizes(): string[] {
    const sizes: string[] = [];

    for (let i = 6; i <= 12; i++) {
      sizes.push(`UK ${i}`);
      if (i !== 12) {
        sizes.push(`UK ${i}.5`);
      }
    }

    return sizes;
  }

  const shoeSizes: string[] = generateShoeSizes();
  interface SelectEvent extends React.ChangeEvent<HTMLSelectElement> {
    target: HTMLSelectElement & {
      value: string;
    };
  }

  const handleChange = (event: SelectEvent) => {
    setSize(event.target.value);
  };
  const user = useAuth()
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
        setImage(imageUrl || '')
      })
      .catch((err: Error) => console.log(err));
  };
  const onSubmit = async (data: Inputs) => {
    try {
      const price = Number(data.price);

      const response = await hello.mutateAsync({
        ...data,
        price, isOriginal: true, size,
        image: image || '',
      });
      console.log('Item created successfully:',
        response
      );
    } catch (err) {
      console.log('Failed to create item:', err);
    }
  };

  const hello = api.listings.create.useMutation();
  const del = api.listings.delete.useMutation();
  const isFormValid = Object.keys(errors).length === 0;
  const { data: listings, isLoading } = api.listings.listUnique.useQuery({ userId: user.userId || '' });


  function deleteListing(id: string) {
    try {
      console.log('trying tod elete', id)
      del.mutateAsync({ id })

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  if (!user.isSignedIn) {
    return (


      <div className='flex flex-col w-10/12 mx-auto gap-5 min-h-screen justify-center items-center text-4xl'>Sign In to Sell Your Shoes
        <SignInButton >
          <Button flat>
            Sign In
          </Button>
        </SignInButton>
      </div>
    )
  }
  return (
    <div className='pt-[6rem] flex items-center flex-col justify-center min-h-screen'>
      <div className='text-2xl font-semibold my-3'>Sell Any Product</div>
      <form className='flex flex-col lg:w-7/12 w-10/12 gap-5 mb-10' onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name', { required: true })} label='Item Name' placeholder='Give the Items Name' />
        <Textarea {...register('description', { required: true })} label='Item Description' placeholder='Give the Items Description' />
        <Input {...register('price', { required: true })} label='Item Price' placeholder='Give the Items Price' type='number' />
        <Input {...register('condition', { required: true })} label='Shoes Condition' placeholder='Give the Shoes Condition' />
        <label htmlFor='image'>Image</label>
        <input type='file' id='image' onChange={handleImageChange} />
        <ImagePreview image={image} />
        <label htmlFor="shoe-size">Select your shoe size:</label>
        <select id="shoe-size" value={size} onChange={handleChange}>
          <option value="">Please select</option>
          {shoeSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <p>You selected {size}</p>
        <Button shadow color={'error'} type='submit' disabled={!isFormValid || !image}>Submit</Button>
      </form>

      <div>
      </div>{listings && listings?.length > 0 &&
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listings?.map((e: Inputs) =>

            <tr key={e.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-pre-wrap">{e.name}</td>
              <td className="px-6 py-4 whitespace-nowrap"><img src={e.image || ''} alt="{{name}}" className="h-16 w-16 object-contain rounded-full" /></td>
              <td className="px-6 py-4 whitespace-nowrap">

                <Button auto rounded className='p-2 rounded-full  bg-rose-500' onClick={() => deleteListing(e.id)} >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
                  </svg>
                </Button>
              </td>

            </tr>
          )
          }

        </tbody>
        </table>}
    </div>
  );
}
