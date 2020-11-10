import React from 'react';
import dynamic from 'next/dynamic';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const TextEditor = ({ ref, value, setValue }) => {
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    theme: 'dark',
  };

  return (
    <React.Fragment>
      <JoditEditor
        ref={ref}
        value={value}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setValue(newContent.target.innerHTML)} // preferred to use only this option to update the content for performance reasons
      />
    </React.Fragment>
  );
};

export default TextEditor;
