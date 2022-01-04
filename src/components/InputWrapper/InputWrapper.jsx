import React from 'react';

export const InputWrapper = ({ label, children }) => {
  return (
    <div className="grid gap-[8px] ">
      <span className="font-bold">{label}</span>
      {children}
    </div>
  );
};
