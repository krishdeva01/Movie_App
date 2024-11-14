import React from 'react';

export default function ServerError() {
  return (
    <div className='404 mt-20'>
      {`Something's missing!`}
      <style>
        {`
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
            font-size: 30px;
          }
        `}
      </style>
    </div>
  );
}
