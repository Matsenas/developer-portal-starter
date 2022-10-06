export interface FilesRes {
  response: string;
  storage: File[];
}

export interface File {
  type: string;
  file_name: string;
  ipfs_uri: string;
  ipfs_url: string;
  uploaded_date: string;
  content_type: string;
  file_size: number;
  file_size_mb: number;
}

export const mockFileRes: FilesRes = {
  response: "OK",
  storage: [...Array(10)].map(() => ({
    type: "file",
    file_name: "my_cool_art.jpeg",
    ipfs_uri: "ipfs://QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ",
    ipfs_url:
      "https://ipfs.io/ipfs/QmRModSr9gQTSZrbfbLis6mw21HycZyqMA3j8YMRD11nAQ",
    uploaded_date: "2021-08-23T17:25:03.501703",
    content_type: "image/jpeg",
    file_size: 85138,
    file_size_mb: 0.0812,
  })),
};
