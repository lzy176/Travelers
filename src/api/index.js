import request from './request';


export const onUpload = (data, signal, onUploadProgress = (e) => e) => {
  return request({
    url: '/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    signal,
    onUploadProgress
  }).catch((thrown) => {
    console.log('Request canceled', thrown.message);
  });
};
export const mergeFileChunk = (data) => {
  return request({
    url: '/merge',
    method: 'post',
    data: JSON.stringify(data)
  });
};