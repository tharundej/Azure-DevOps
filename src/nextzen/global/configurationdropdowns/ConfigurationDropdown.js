
import axios from "axios";
import { baseUrl } from "../BaseUrl";
const leavePeriodType = async () => {
  try {
    const data1 = JSON.stringify({
      "companyID": "COMP1"
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/filterLeavePeriodType`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data1
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export   {leavePeriodType}