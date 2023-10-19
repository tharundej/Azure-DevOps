const post = (endPoint, data) => {
  let obj = {
    status: 'failed',
  };
  const response = axios.post(`http://localhost:8081/${endPoint}`, data).then(
    (successData) => {
      if (successData.data) {
        obj['data'] = successData.data;
        obj['status'] = 'success';
      }
      console.log('sucess');
      return obj;
    },
    (error) => {
      obj['message'] = error.message | '';
      console.log('lllll');
      return obj;
    }
  );
};
