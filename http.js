/**
 * EasyHTTP Library
 * Library fir making HTTP requests
 * 
 * @version 3.0.0
 * @author Ryan Koech
 * @license MIT
 * 
**/

class EasyHTTP {
  //Make a HTTP GET Request
  async get(url){

    const response = await fetch(url);
    const resData = await response.json();
    return resData;

  }

  //Make HTPP POST request
  async post(url, data){

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)
    });
    const resData = await response.json();
    return resData;
  }

  //Make HTPP PUT request
  async put(url, data){
    console.log(data);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    const resData = await response.json();
    return resData ;

  }

  //Delete POST
  async delete(url){

      const response = await fetch(url, {
        method: 'DELETE',
        header: {
          'Content-type' : 'application/json'
        },
      })
      const resData = await response.json();
      return resData + '....Deleted';
  }
}

export const http = new EasyHTTP();