import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

//function for making http request
async function sendHttpRequest(url, config) {
    
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Failed to Send Request!");
  }
  return resData;
}

export default function useHttp(url, config , initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //function for sending the actual http request 
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        //access sendHttpRequest function for making http request
        const resData = await sendHttpRequest(url, {...config , body: data});
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went Wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  //initiates the http request by calling sendRequest Function
  useEffect(() => {
    if((config && (config.method === 'GET' || !config.method)) || !config){
        sendRequest();
    }
  },  [ sendRequest, config ]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
