import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoInfo } from '../api/sanity';
import imageUrlBuilder from '@sanity/image-url';
import client from './../api/sanity';
import { createCanvas } from 'canvas';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Iframe = styled.iframe`
  @media (max-width: 2020px) {
    width: 800px;
    height: 400px;
  }
  @media (max-width: 1520px) {
    width: 600px;
    height: 300px;
  }
  @media (max-width: 1020px) {
    width: 500px;
    height: 300px;
  }
  @media (max-width: 520px) {
    width: 400px;
    height: 200px;
  }
  @media (max-width: 400px) {
    width: 350px;
    height: 200px;
  }
`;
const TextDiv = styled.div`
  @media (max-width: 2020px) {
    width: 800px;
  }
  @media (max-width: 1520px) {
    width: 600px;
  }
  @media (max-width: 1020px) {
    width: 500px;
  }
  @media (max-width: 520px) {
    width: 400px;
  }
  @media (max-width: 400px) {
    width: 350px;
  }
`;
const Hr = styled.hr`
  border: none;
  width: 100%;
  height: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Video = () => {
  const [videoData, setVideoData] = useState({});

  const [imageSrc, setImageSrc] = useState('');
  const [color, setColor] = useState('');
  const { id } = useParams();
  const link = videoData?.link;

  const extractVideoId = (link) => {
    let videoId;
    if (link?.includes('watch?v=')) {
      videoId = link.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (link?.includes('youtu.be/')) {
      videoId = link.split('/')[3];
    }
    return videoId;
  };

  const extractColorFromImage = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = createCanvas(img.width, img.height);
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);
        const imageData = context.getImageData(
          0,
          0,
          img.width,
          img.height
        ).data;
        const colorCounts = {};
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const color =
            '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
          if (color in colorCounts) {
            colorCounts[color]++;
          } else {
            colorCounts[color] = 1;
          }
        }
        // Verifica se a cor predominante é preto ou similar ou branco ou similar
        const isBlackOrWhite = (color) => {
          const [r, g, b] = color
            .slice(1)
            .match(/.{1,2}/g)
            .map((value) => parseInt(value, 16));
          const threshold = 20;
          if (r <= threshold && g <= threshold && b <= threshold) {
            return true; // é preto ou similar
          }
          if (
            r >= 255 - threshold &&
            g >= 255 - threshold &&
            b >= 255 - threshold
          ) {
            return true; // é branco ou similar
          }
          return false;
        };
        let maxCount = 0;
        let mostCommonColor = null;
        let secondMostCommonColor = null;
        for (const color in colorCounts) {
          if (colorCounts[color] > maxCount) {
            if (!isBlackOrWhite(color)) {
              // ignora preto ou similar e branco ou similar
              secondMostCommonColor = mostCommonColor;
              maxCount = colorCounts[color];
              mostCommonColor = color;
            }
          } else if (
            colorCounts[color] > (colorCounts[secondMostCommonColor] || 0)
          ) {
            if (!isBlackOrWhite(color)) {
              // ignora preto ou similar e branco ou similar
              secondMostCommonColor = color;
            }
          }
        }
        if (isBlackOrWhite(mostCommonColor)) {
          resolve(secondMostCommonColor);
        } else {
          resolve(mostCommonColor);
        }
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = imageSrc;
    });
  };
  const videoId = extractVideoId(link);

  useEffect(() => {
    const fetchVideo = async () => {
      const data = await getVideoInfo(id);
      setVideoData(data);
    };
    fetchVideo();
  }, [id]);

  const builder = imageUrlBuilder(client);
  let imageUrl = '';

  setTimeout(async () => {
    imageUrl = builder.image(videoData?.imageUrl).url();
    const color = await extractColorFromImage(imageUrl);
    setColor(color);
    setImageSrc(imageUrl);
  }, 1000);

  const handleNextClick = () => {
    // função que lida com o clique no botão "próximo"
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1); // se houver um próximo vídeo, incrementa o índice
    } else {
      setCurrentIndex(0); // se não houver um próximo vídeo, reinicia o índice
    }
  };

  useEffect(() => {
    // função useEffect para carregar os dados do vídeo com base no ID da URL
    const fetchVideoData = async () => {
      const data = await getVideoInfo(id);
      setVideoData(data);
      const builder = imageUrlBuilder(client);
      const imageUrl = builder.image(data.poster).auto('format').url();
      setImageSrc(imageUrl);
      const color = await extractColorFromImage(imageUrl);
      setColor(color);
    };
    fetchVideoData();
  }, [id]);

  return (
    <>
      {color ? (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ ease: 'linear', duration: 1.0, delay: 0.1 }}
          className='  flex flex-col justify-center items-center h-screen w-screen'
        >
          <Iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='iframe'
          />
          <TextDiv className='flex  flex-col '>
            <p
              className='font-Roboto font-bold text-lg mb-1'
              style={{ color: color }}
            >
              JUST
            </p>
            <h1 className='font-RussoOne text-2xl'>{videoData?.title}</h1>
            <p className='font-Roboto text-[#666] font-extrabold'>
              {videoData?.subtitle}
            </p>

            <Hr
              className=' '
              style={{
                backgroundColor: color,
              }}
            />
            <p className='font-Roboto'>{videoData?.about}</p>
            <Hr
              className=' '
              style={{
                backgroundColor: color,
              }}
            />
            <p className='font-Roboto mb-5'>{videoData?.description}</p>
          </TextDiv>
          {/* Renderize o player de vídeo aqui */}
        </motion.div>
      ) : (
        ''
      )}
    </>
  );
};

export default Video;
