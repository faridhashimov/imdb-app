import React from 'react'
import SkeletonAnimation from '../skeletonAnimation/SkeletonAnimation';

const EmptyMovieList = () => {
  return (
    <div className='flex flex-wrap justify-around w-4/5 mr-16 items-center p-3 shadow-2xl'>
        <SkeletonAnimation/>
        <SkeletonAnimation/>
        <SkeletonAnimation/>
        <div className='font-bold w-full mt-10 text-center'><p>Please enter a search term above</p> </div>  
    </div>
  )
}

export default EmptyMovieList