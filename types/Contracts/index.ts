export interface ContractsRes {
  response: string;
  contracts: Contract[];
}

export interface Contract {
  name: string;
  symbol: string;
  transaction_hash: string;
  transaction_external_url: string;
  chain: string;
  address: string;
  owner_address: string;
  creation_date: string;
  metadata_frozen: boolean;
  type: string;
  royalties_share: number;
  royalties_address: string;
}

export const mockContractRes: ContractsRes = {
  response: "OK",
  contracts: [...Array(30)].map(() => ({
    name: "Good Company Tokens",
    symbol: "GCT",
    transaction_hash: "0x124141or0f10140112381381dd",
    transaction_external_url:
      "https://rinkeby.etherscan.io/tx/0xf9bd460983cbd6cf974ac380760a914696bb68dd2b2cb38d1dbc4ba2358a83b0",
    chain: "rinkeby",
    address: "0x12f28e2106ce8fd8464885b80ea865e98b465149",
    owner_address: "0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42",
    creation_date: "2021-08-23T17:25:03.501703",
    metadata_frozen: true,
    type: "erc721",
    royalties_share: 500,
    royalties_address: "0x5FDd0881Ef284D6fBB2Ed97b01cb13d707f91e42",
  })),
};
