export interface MintsRes {
  response: string;
  total: number;
  minted_nfts: Mint[];
}

export interface Mint {
  chain: string;
  transaction_hash: string;
  transaction_external_url: string;
  contract_name: string;
  contract_address: string;
  type: string;
  token_id: string;
  mint_to_address: string;
  metadata_uri: string;
  quantity: number;
  burned_transferred_amount: number;
  metadata_frozen: boolean;
  mint_date: string;
}

const mockPagesNum = 40;

const x = Array.from({ length: mockPagesNum }, (_, i) => i + 1).map((i) => {
  const obj = {
    response: "OK",
    total: mockPagesNum * 50,
    minted_nfts: [...Array(50)].map(() => ({
      chain: "3rdset",
      transaction_hash: "0x124141or0f10140112381381dd",
      transaction_external_url:
        "https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1",
      contract_name: "Testopunkz",
      contract_address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
      type: "erc721",
      token_id: `${i}`,
      mint_to_address: "0xc155f9bd6b71e9f71d0236b689ad7c2c5d16febf",
      metadata_uri:
        "ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
      quantity: 1,
      burned_transferred_amount: 0,
      metadata_frozen: true,
      mint_date: "2021-08-23T17:25:03",
    })),
  };
  return [i, obj];
});

export let mockPages = Object.fromEntries(x);
