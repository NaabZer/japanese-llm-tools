// src/components/TestHeightAnimation.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TestHeightAnimation() {
  const [showTallContent, setShowTallContent] = useState(false);

  // Variants for the content's fade/slide
  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div style={{ padding: '20px', border: '2px solid blue', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Framer Motion Height Animation Test</h2>
      <button onClick={() => setShowTallContent(!showTallContent)} style={{ marginBottom: '20px', padding: '10px 20px' }}>
        Toggle Content Height
      </button>

      {/* The container that will animate its height */}
      <div style={{ border: '1px solid red', width: '300px', background: '#f0f0f0', overflow: 'hidden' }}> {/* Added overflow:hidden here */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showTallContent ? "tall" : "short"} // Unique key for AnimatePresence
            layout // <--- This is the key for height animation
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            // No explicit height, max-height, or overflow on this motion.div
            // It should naturally size to its content
            style={{ padding: '10px' }} // Add some padding for visual clarity
          >
            {showTallContent ? (
              <div>
                <p>This is the TALL content.</p>
                <p>It has multiple lines to make it taller.</p>
                <p>Line 3</p>
                <p>Line 4</p>
                <p>Line 5</p>
                <p>Line 6</p>
                <p>Line 7</p>
                <p>Line 8</p>
              </div>
            ) : (
              <div>
                <p>This is the SHORT content.</p>
                <p>Just two lines.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TestHeightAnimation;
