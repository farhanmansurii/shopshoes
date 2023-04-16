import { Loading } from "@nextui-org/react";
import { type Listing } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: listings, isLoading } = api.listings.list.useQuery();
  console.log(listings)
  type Inputs = {
    id: string
    name: string;
    description: string;
    price: number;
    image: string
    condition: string
  };
  if (isLoading) {

    return (
      <div className='pt-[6rem] flex min-h-screen items-center justify-center'><Loading /></div>
    )
  }
  return (
    <>
      <Head>
        <title>SellYoShoes</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 py-[6rem] lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings?.map((product: Inputs) => (
            <Link key={product.id} href={`/${product?.id}`} className="flex flex-col border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition duration-200 hover:scale-105">
              <div className=" pb-3/4">
                <img src={product?.image} alt={product.name} className="  w-full h-full object-cover" />
              </div>
              <div className="px-4 py-2 flex-grow">
                <h2 className="text-lg font-medium mb-2 capitalize">{product.name}</h2>
                <div className="flex gap-2">

                  <p className="text-gray-500 font-medium mb-2 ">₹{product.price}</p>
                  <p className={`text-xs mb-2 w-fit bg-green-100 px-3 py-1 capitalize rounded-xl font-medium ${product?.condition === 'new' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {product?.condition}
                  </p> </div>
                </div>
            </Link>
          ))}
        </div>
      </div >
    </>
  );
};

export default Home;
