
import SkeletonComponent from '@/components/SkeletonComponent';
import React from "react";

const loading = () => {
  return (
    <div className='flex flex-wrap max-w-5xl mx-auto p-20 gap-8 justify-center items-center '>
        <SkeletonComponent />
        <SkeletonComponent />
        <SkeletonComponent />
        <SkeletonComponent />
        <SkeletonComponent />
        <SkeletonComponent />
    </div>
  );
};

export default loading;
