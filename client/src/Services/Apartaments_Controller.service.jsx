import axios from "axios";

export const ApartmentsService = {
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
      alert(error);
    });
}

function getMarkers(city) {
  return axios
    .get(`/markers/${city}`, getRequestOptions("GET"))
    .then(handleResponse)
    .then((markers) => {
      return markers;
    }).catch(() => {
      alert("Servidor sin conexión, ejecuta nodejs");
    });
}

function getDetailsMarkers(ids) {
  return axios
    .get(`/markers/ids/${ids}`, getRequestOptions("GET"))
    .then(handleResponse)
    .then((details) => {
      return details;
    }).catch((error) => {
      alert(error);
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
