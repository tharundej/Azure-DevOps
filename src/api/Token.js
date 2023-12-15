export const apiHeaders = {
  headers: {
    Authorization: localStorage.getItem('userDetails')
      ? JSON.parse(localStorage.getItem('userDetails')).accessToken
      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI3MDgyOTgsInVzZXJuYW1lIjoiYW5pbGdAaW5mb2JlbGxpdC5jb20ifQ.OwGmLDibuYF44jpYkTZHzUKCOnFChAZc4QjgOuWh0I8',
    'Content-Type': 'application/json',
  },
};
