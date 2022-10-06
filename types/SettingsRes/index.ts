export interface SettingsRes {
  response: string;
  profile: Profile;
  subscription_period?: SubscriptionPeriod;
  data_usage_and_limits: DataUsage;
  minting_usage_and_limits: MintingUsageAndLimits;
}

export interface Profile {
  name: string;
  email: string;
  joined_date: string;
}

interface SubscriptionPeriod {
  start_date: string;
  end_date: string;
}

export interface DataUsage {
  data_usage: {
    subscription_data_requests_made: number;
  };
  data_limits: {
    subscription_data_requests_included: number;
    max_data_requests_per_second: number;
    max_data_requests_per_month: number;
  };
}

export interface MintingUsageAndLimits {
  [chain: string]: MintingUsage;
}

export interface MintingUsage {
  minting_usage: {
    total_nfts_minted: number;
    subscription_nfts_minted: number;
  };
  minting_limits: {
    max_mints: number;
    subscription_mints_included: number;
  };
  contract_deployment_usage: {
    total_contracts_deployed: number;
    subscription_contracts_deployed: number;
  };
  contract_deployment_limits: {
    max_contracts: number;
    subscription_contracts_included: number;
  };
}

export const settingsMockRes: SettingsRes = {
  response: "OK",
  profile: {
    name: "Satoshi Nakamoto",
    email: "satoshi@bitcoin.org",
    joined_date: "2021-10-17T00:00:00+00:00",
  },
  subscription_period: {
    start_date: "2022-01-18T12:40:51.519608",
    end_date: "2022-02-17T12:40:51.519613",
  },
  data_usage_and_limits: {
    data_usage: {
      subscription_data_requests_made: 1234,
    },
    data_limits: {
      subscription_data_requests_included: 150000,
      max_data_requests_per_second: 10,
      max_data_requests_per_month: 500000,
    },
  },
  minting_usage_and_limits: {
    polygon: {
      minting_usage: {
        total_nfts_minted: 12856,
        subscription_nfts_minted: 2856,
      },
      minting_limits: {
        max_mints: 100,
        subscription_mints_included: 500,
      },
      contract_deployment_usage: {
        total_contracts_deployed: 18,
        subscription_contracts_deployed: 4,
      },
      contract_deployment_limits: {
        max_contracts: 8,
        subscription_contracts_included: 15,
      },
    },
    rinkeby: {
      minting_usage: {
        total_nfts_minted: 9895,
        subscription_nfts_minted: 1100,
      },
      minting_limits: {
        max_mints: 100,
        subscription_mints_included: 500,
      },
      contract_deployment_usage: {
        total_contracts_deployed: 8,
        subscription_contracts_deployed: 6,
      },
      contract_deployment_limits: {
        max_contracts: 8,
        subscription_contracts_included: 15,
      },
    },
  },
};
