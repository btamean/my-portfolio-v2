// components/AnimatedBox.tsx
'use client';

import { motion } from 'framer-motion';

export default function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#0070f3',
        borderRadius: '12px'
      }}
    />
  );
}