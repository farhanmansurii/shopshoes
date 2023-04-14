/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { api } from '~/utils/api';

type Inputs = {
  name: string;
  description: string;
  price: number;
  // image: FileList;
};

export default function Sell() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {

    console.log(data)

    await api.listings.create.mutateAsync(formData);
  };

  return (
    <div className='pt-[6rem] flex items-center justify-center min-h-screen'>
      <form className='flex flex-col w-7/12 gap-5' onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name', { required: true })} label="Item Name" placeholder='Give the Items Name' />
        <Textarea {...register('description', { required: true })} label="Item Description" placeholder='Give the Items Description' />
        <Input {...register('price', { required: true })} label="Item Price" placeholder='Give the Items Price' type='number' />
        {/* <Input {...register('image', { required: true })} label="Item Image" type='file' /> */}
        <Button type='submit' >Submit</Button>
      </form>
    </div>
  );
}
