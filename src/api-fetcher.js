import fetch from 'isomorphic-unfetch';

export const fetcher = async (...args) => {
  const response = await fetch(...args);

  const data = await response.json();

  return data;
};
