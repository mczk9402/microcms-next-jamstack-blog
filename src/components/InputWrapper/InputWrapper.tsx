import { StringifyOptions } from 'querystring';
import React, { VFC } from 'react';

interface Props {
  label: string;
  children: any;
}

export const InputWrapper: VFC<Props> = ({ label, children }) => {
  return (
    <div className="grid gap-[8px] ">
      <span className="font-bold">{label}</span>
      {children}
    </div>
  );
};
