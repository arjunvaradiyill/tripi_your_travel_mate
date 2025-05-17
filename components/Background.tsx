'use client'
import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://i.pinimg.com/736x/31/c5/6c/31c56c57711fcd62c1cd568991d44f81.jpg"
          alt="Background"
          className="w-full h-full object-cover object-center"
          style={{
            minHeight: '100vh',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0
          }}
        />
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
          style={{
            minHeight: '100vh',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0
          }}
        />
      </div>
    </div>
  );
};

export default Background; 