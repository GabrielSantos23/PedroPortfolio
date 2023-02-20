import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <motion.div
      animate={{ opacity: 0 }}
      initial={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Skeleton
        baseColor='#0A0A0A'
        highlightColor='#0C0C0C'
        width={400}
        height={250}
      />
    </motion.div>
  );
};

export default Loading;
