export interface LogsRes {
  response: string;
  total: number;
  logs: Log[];
}

export interface Log {
  method: string;
  request_details: Object;
  endpoint: string;
  status: number;
  error_code: string;
  error_message: string;
  request_date: string;
}

export const mockLogsRes: LogsRes = {
  response: "OK",
  total: 1,
  logs: [...Array(30)].map(() => ({
    method: "POST",
    request_details: {
      chain: "polygon",
      contract_address: "388458484884220824084208240808240242480",
      metadata_uri: "83825858258025082508245082082082408",
      tokenId: "1323",
    },
    endpoint: "/v0/mints/customizable",
    status: generateRandom(200, 400),
    error_code: "403",
    error_message: "mint limit exceeded",
    request_date: "2021-08-23T17:25:03.501703",
  })),
};

function generateRandom(min = 0, max = 100) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}
