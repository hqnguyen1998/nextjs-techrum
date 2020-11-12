import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const defaultConfig = {
  readonly: false,
  buttons: [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'ul',
    'ol',
    '|',
    'font',
    'fontsize',
    'brush',
    'paragraph',
    '|',
    'center',
    'left',
    'right',
    'justify',
    '|',
    'link',
    'image',
    'video',
    '|',
    'hr',
    'symbol',
  ],
  uploader: {
    insertImageAsBase64URI: false,
    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
  },
  removeButtons: ['brush', 'file'],
  showXPathInStatusbar: false,
  showCharsCounter: false,
  showWordsCounter: false,
  toolbarAdaptive: false,
};

const TextEditor = ({ value, onChange, config = defaultConfig }) => {
  const editor = useRef();

  return (
    <JoditEditor
      ref={editor}
      config={config}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextEditor;
