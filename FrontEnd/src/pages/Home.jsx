import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/sanity';
import imageUrlBuilder from '@sanity/image-url';
import client from './../api/sanity';
import Loading from './../Components/Loading';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(posts);

  const builder = imageUrlBuilder(client);

  const [showVideos, setShowVideos] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setShowVideos(true);
      }, 1500);

      async function fetchData() {
        const postsData = await getPosts();
        setPosts(postsData.map((post) => ({ ...post, loaded: false })));
        setLoading(false);
      }
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  console.log(showVideos);

  return (
    <div className='mt-36 sm:mt-0  mx-auto max-w-screen-xl flex items-center justify-center h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-center'>
        {posts.map((post, index) => (
          <div
            key={post._id}
            className='mb-4'
            onMouseEnter={() => setHoveredId(post._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {showVideos ? (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ ease: 'linear', duration: 1.0, delay: 0.1 }}
              >
                <Link to={`videos/${post._id}`}>
                  <img
                    src={builder.image(post.imageUrl.asset).width(400).url()}
                    alt={post.title}
                    className='mx-auto'
                    onClick={() => console.log(post._id)}
                  />
                </Link>
                <p className='font-RussoOne text-[#FFC93A]'>JUST</p>
                {hoveredId === post._id ? (
                  <h2
                    className='font-RussoOne uppercase 
                  transition duration-500 ease-in-out
                  text-[#FFC93A]'
                  >
                    {post.title}
                  </h2>
                ) : (
                  <h2 className='font-RussoOne uppercase'>{post.title}</h2>
                )}
                <p className='text-[#666] font-bold'>{post.subtitle}</p>
              </motion.div>
            ) : (
              <Loading />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
