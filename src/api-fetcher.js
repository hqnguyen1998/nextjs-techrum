import fetch from 'isomorphic-unfetch';

export const fetcher = async (...args) => {
  const response = await fetch(...args);

  return await response.json();
};
