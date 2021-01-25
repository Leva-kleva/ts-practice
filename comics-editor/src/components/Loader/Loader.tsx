import React from 'react';
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 100px auto;
  border-color: red;
`;

export const Loader: React.FC = () => {
  return (
    <div className="sweet-loading">
      <RingLoader css={override} size={200} color={'#1438CE'} loading={true} />
    </div>
  );
};
