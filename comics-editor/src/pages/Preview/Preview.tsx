import React from 'react';
import { useSelector } from 'react-redux';

export const Preview = () => {
  const { storedValues } = useSelector((state: any) => state.editorReducer);

  return (
    <>
      {storedValues &&
        storedValues.map((markup: any) => (
          <div dangerouslySetInnerHTML={{ __html: markup }} />
        ))}
    </>
  );
};
