import React from 'react';

interface DescriptionProps {
  title: string;
  eventName: string;
}

const Description: React.FC<DescriptionProps> = ({ title, eventName }) => {
  return (
    <div className='bg-black h-screen flex flex-col justify-center items-center text-white'>
      <h2 className="text-5xl font-[Karantina-regular] mb-4">{title}</h2>
      <p className="text-3xl font-[Karantina-regular]">{eventName}</p>
    </div>
  );
}

export default Description;
