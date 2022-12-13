import axios from "axios";

const preprocessing = {
  find(request) {
    return axios.post(
      "/preprocessing-api/missing-value/find",
      request
    );
  },
  run(method, idxCol, request) {
    return axios.post(
      "/preprocessing-api/missing-value/run?method=" +
        method +
        "&idx_col=" +
        idxCol,
      request
    );
  },
  deleteMissingValue(request) {
    return axios.post(
      "/preprocessing-api/missing-value/delete",
      request
    );
  },
  interpolate(request) {
    return axios.post(
      "/preprocessing-api/missing-value/interpolate",
      request
    );
  },
  predict(request) {
    return axios.post(
      "/preprocessing-api/missing-value/predict",
      request
    );
  },
  pearsonCorrelation(request) {
    return axios.post(
      "/preprocessing-api/pearson-correlation",
      request
    );
  },
  std(request) {
    return axios.post("/preprocessing-api/std", request);
  },
  mean(request) {
    return axios.post("/preprocessing-api/mean", request);
  },
  visualize(request) {
    return axios.post(
      "/preprocessing-api/visualize",
      request
    );
  },
  denoise(request, com, datasetId) {
    return axios.post(
      "/preprocessing-api/denoise?com=" +
        com +
        "&datasetId=" +
        datasetId,
      request
    );
  },
};

export default preprocessing;