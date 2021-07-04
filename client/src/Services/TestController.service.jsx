import axios from "axios";

export const TestService = {
  getMarkers,
  getDetailsMarkers,
  getApartments_types
};

function getApartments_types(option,city) {
  return axios
    .get(`/getApartments_types/${city}/${option}`, getRequestOptions("GET"))
    .then(handleResponse)
    .then((types) => {
      return types;
    }).catch((error) => {
      console.log("error getApartments_types");
    });
}

function getMarkers(city) {
  return axios
    .get(`/markers/${city}`, getRequestOptions("GET"))
    .then(handleResponse)
    .then((markers) => {
      return markers;
    }).catch((error) => {
      console.log("error getMarkers");
    });
}

function getDetailsMarkers(ids) {
  return axios
    .get(`/markers/ids/${ids}`, getRequestOptions("GET"))
    .then(handleResponse)
    .then((details) => {
      return details;
    }).catch((error) => {
      console.log("error getDetailsMarkers");
    });
}

function getRequestOptions(method) {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
}

function handleResponse(response) {
  var p = new Promise((resolve, reject) => {
    const data = response.data;
    if (response.status >= 400) {
      const error = response.statusText;
      reject(error);
    }

    resolve(data);
  });
  return p.then((data) => {
    return data;
  });
}
