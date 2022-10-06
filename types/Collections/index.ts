export interface ContractCollectionsRes {
  response: string;
  contracts: CollectionContract[];
}

export interface CollectionContract {
  name: string;
  symbol: string;
  transaction_hash: string;
  transaction_external_url: string;
  chain: string;
  address: string;
  owner_address: string;
  creation_date: string;
  metadata_frozen: boolean;
  max_supply: number;
  mint_price: number;
  tokens_per_mint: number;
  treasury_address: string;
  public_mint_start: string;
  base_uri: string;
  prereveal_token_uri: string;
  presale_mint_start: string;
  presale_whitelisted_addresses: string[];
  presale_merkle_root: string;
  royalties_share: number;
  royalties_address: string;
  merkle_proofs?: {
    [key: string]: string[];
  };
}

export const mockContractCollectionRes: ContractCollectionsRes = {
  response: "OK",
  contracts: [...Array(10)].map(() => ({
    name: "CoolCodeCats",
    symbol: "CCC",
    transaction_hash:
      "0x963c80360e6f822326f0ce38dc2cf0389dbf8e692bb368ab8e30143b76ac3267",
    transaction_external_url:
      "https://rinkeby.etherscan.io/tx/0x963c80360e6f822326f0ce38dc2cf0389dbf8e692bb368ab8e30143b76ac3267",
    chain: "rinkeby",
    address: "0x17b63bc7bd3e1e0ca6c368d474f0261936ab971a",
    owner_address: "0x09F6b4E9FFA6dbF106e205540F64712189408Ec3",
    creation_date: "2022-07-12T21:26:37.388951",
    metadata_frozen: false,
    max_supply: 9499,
    team_reserve: 0,
    mint_price: 0.001,
    tokens_per_mint: 2,
    treasury_address: "0x09F6b4E9FFA6dbF106e205540F64712189408Ec3",
    public_mint_start: "2022-07-12T11:30:48",
    base_uri:
      "https://ipfs.io/ipfs/bafybeifzbh5f5ftjqxbijncerxsx26k74rj452jhqg7iqw5swetq4ipqai/",
    prereveal_token_uri: "",
    presale_mint_start: "2022-07-11T11:30:48",
    presale_whitelisted_addresses: [
      "0x66DC3EEF56C3631B0707C7a37c6EbeB3ce291766",
    ],
    presale_merkle_root:
      "af5db3b937ffd741e161e15dda23a2beab7926e6f4ba6d586bed2c466e18d6ea",
    royalties_share: 1000,
    royalties_address: "0x09F6b4E9FFA6dbF106e205540F64712189408Ec3",
  })),
};
