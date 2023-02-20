import React, { useEffect, useState } from 'react';
import { getContact } from '../api/sanity';
import imageUrlBuilder from '@sanity/image-url';
import client from './../api/sanity';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [getInfoA, setGetInfoA] = useState([]);
  const builder = imageUrlBuilder(client);
  const [image, setImage] = useState('');
  const info = getInfoA[0];

  useEffect(() => {
    async function fetchData() {
      const postsData = await getContact();
      setGetInfoA(postsData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (info) {
      const imageUrl = builder.image(info?.profilePicture).url();
      console.log(imageUrl);
      setImage(imageUrl);
    }
  }, [info]);
  console.log(info);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ ease: 'linear', duration: 1.0 }}
      className='text-white flex lg:flex-row flex-col-reverse  items-center justify-center w-full h-screen'
    >
      <div className='pl-3 max-w-[420px] mr-20 '>
        <div className=' pb-10'>
          <h1 className='font-RussoOne text-3xl mb-1'>{info?.title}</h1>
          <p className='font-Roboto '>{info?.subtitle}</p>
        </div>
        <div className='pb-10'>
          <h1 className='font-RussoOne text-lg mb-1'>personal</h1>
          <Link to={`mailto:${info?.email}`}>
            <p className='font-Roboto '>{info?.email}</p>
          </Link>
        </div>
        <div className='pb-10'>
          <h1 className='font-RussoOne text-lg mb-1'>instagram</h1>
          <Link target='blank' to={`https://instagram.com/${info?.instagram}`}>
            <p className='font-Roboto '>{info?.instagram}</p>
          </Link>
        </div>
        <div className='pb-10'>
          <h1 className='font-RussoOne text-lg mb-1'>youtube</h1>
          <Link to={`https://www.youtube.com/${info?.youtube}`} target='blank'>
            <p className='font-Roboto '>{info?.youtube}</p>
          </Link>
        </div>
      </div>
      <div>
        <img
          className='w-[250px] mt-80 sm:mt-0 max-w-full h-auto'
          src={image}
          alt=''
        />
      </div>
    </motion.div>
  );
};

export default Contact;
