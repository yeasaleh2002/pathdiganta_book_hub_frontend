"use client";

import React from "react";

export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md ${className}`} />
  );
};

export const BookCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 p-4 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm w-full max-w-sm bg-white dark:bg-gray-900">
      <Skeleton className="w-full h-56 rounded-lg" />
      <div className="flex flex-col gap-2 mt-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
    </div>
  );
};

export const DetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto p-6">
      <Skeleton className="w-full md:w-1/3 h-[500px] rounded-xl" />
      <div className="flex flex-col gap-5 w-full md:w-2/3 py-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full mt-6" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-4 mt-8">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const GridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {[...Array(8)].map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
};
