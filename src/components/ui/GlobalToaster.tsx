"use client";

import React from "react";
import { Toaster } from 'react-hot-toast';

export const GlobalToaster = () => {
  return (
    <Toaster 
      position="top-right" 
      toastOptions={{
        className: 'dark:bg-gray-800 dark:text-white border dark:border-gray-700 shadow-xl',
        duration: 4000,
        style: {
          borderRadius: '12px',
          padding: '16px',
        }
      }} 
    />
  );
};
