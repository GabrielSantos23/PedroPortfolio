import React, { useEffect, useState } from 'react';
import { getInfo } from '../api/sanity';
import imageUrlBuilder from '@sanity/image-url';
import client from './../api/sanity';
import { motion } from 'framer-motion';
const About = () => {
  const [getInfoA, setGetInfoA] = useState([]);
  const builder = imageUrlBuilder(client);
  const [image, setImage] = useState('');
  const info = getInfoA[0];

  useEffect(() => {
    async function fetchData() {
      const postsData = await getInfo();
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
      <div className='pl-3 max-w-[420px] mr-5'>
        <div className=' pb-10'>
          <h1 className='font-RussoOne text-3xl mb-1'>{info?.apresentation}</h1>
          <p className='font-Roboto '>{info?.resume}</p>
        </div>
        <div className='pb-10'>
          <h1 className='font-RussoOne text-lg mb-1'>{info?.subtitle}</h1>
          <p className='font-Roboto '>{info?.about}</p>
        </div>
        <div className='pb-5'>
          <h1 className='font-RussoOne text-lg mb-1'>{info?.courses}</h1>
          {info?.courses1 ? (
            <p className='font-Roboto '>- {info?.courses1}</p>
          ) : (
            ''
          )}
          {info?.courses2 ? (
            <p className='font-Roboto '>- {info?.courses2}</p>
          ) : (
            ''
          )}

          {info?.courses3 ? (
            <p className='font-Roboto '>- {info?.courses3}</p>
          ) : (
            ''
          )}
          {info?.courses4 ? (
            <p className='font-Roboto '>- {info?.courses4}</p>
          ) : (
            ''
          )}
          {info?.courses5 ? (
            <p className='font-Roboto '>- {info?.courses5}</p>
          ) : (
            ''
          )}
          {info?.courses6 ? (
            <p className='font-Roboto '>- {info?.courses6}</p>
          ) : (
            ''
          )}
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

export default About;
