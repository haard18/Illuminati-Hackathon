import React from 'react';

interface DescriptionProps {
  title: string;
  eventName: string;
}

const Description: React.FC<DescriptionProps> = ({ title, eventName }) => {
  return (
    <div className=" h-[150px] px-4 flex flex-col justify-start items text-white font-['Kanit-Regular']">
      <h2 className="text-3xl font-['Kanit-Bold'] mb-4">{title}</h2>
      <p className="text-2xl ">{eventName}</p>
    </div>
  );
}

export default Description;
