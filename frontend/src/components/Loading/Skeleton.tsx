import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave';
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className = '',
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-200 rounded';
  
  const variantClasses = {
    text: 'h-4',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Predefined skeleton components for common use cases
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <Skeleton height={192} className="w-full" />
    <div className="p-6 space-y-3">
      <Skeleton height={20} width="80%" />
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} width={16} height={16} variant="circular" />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Skeleton height={24} width="60px" />
        <Skeleton height={20} width="40px" />
      </div>
      <Skeleton height={40} className="w-full" />
    </div>
  </div>
);

export const ProductListSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="flex">
      <Skeleton height={192} width={192} />
      <div className="flex-1 p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <Skeleton height={24} width="60%" />
            <Skeleton height={16} width="40%" />
            <Skeleton height={14} width="80%" />
          </div>
          <div className="flex space-x-2">
            <Skeleton width={32} height={32} variant="circular" />
            <Skeleton width={32} height={32} variant="circular" />
            <Skeleton width={32} height={32} variant="circular" />
          </div>
        </div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} width={16} height={16} variant="circular" />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton height={24} width="60px" />
            <Skeleton height={20} width="40px" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex border rounded-lg">
              <Skeleton width={32} height={32} />
              <Skeleton width={32} height={32} />
              <Skeleton width={32} height={32} />
            </div>
            <Skeleton height={40} width="120px" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const NavbarSkeleton: React.FC = () => (
  <div className="w-full bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <Skeleton width={40} height={40} variant="circular" />
          <Skeleton height={24} width={120} />
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={16} width={60} />
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} width={32} height={32} variant="circular" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="relative h-screen flex items-center justify-center overflow-hidden">
    <Skeleton height="100%" className="w-full" />
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
      <Skeleton height={80} width="80%" className="mx-auto mb-4 bg-white/20" />
      <Skeleton height={32} width="60%" className="mx-auto mb-6 bg-white/20" />
      <Skeleton height={24} width="70%" className="mx-auto mb-8 bg-white/20" />
      <Skeleton height={48} width={200} className="mx-auto bg-white/20" />
    </div>
  </div>
);

export const CategorySkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="relative group cursor-pointer">
        <Skeleton height={192} className="w-full rounded-xl" />
        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-center text-white">
            <Skeleton height={32} width={120} className="mx-auto mb-2 bg-white/20" />
            <Skeleton height={20} width={80} className="mx-auto bg-white/20" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const StatsSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="text-center text-white">
        <Skeleton height={64} width={64} className="mx-auto mb-3 bg-white/20" />
        <Skeleton height={48} width={80} className="mx-auto mb-2 bg-white/20" />
        <Skeleton height={20} width={100} className="mx-auto bg-white/20" />
      </div>
    ))}
  </div>
);

export default Skeleton;
