import React from 'react';

export const Heading1 = ({ title, description }) => {
  return (
    <div className="grid gap-[14px] pb-[16px] border-b border-[#ccc] translate-y-[-40px]">
      <h1 className="text-[36px] font-bold">{title}</h1>
      <p className="text-[14px]">{description}</p>
    </div>
  );
};

export const Heading2 = ({ title }) => {
  return <h2 className="mb-[16px] text-[28px] font-bold">{title}</h2>;
};
