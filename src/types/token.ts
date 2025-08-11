export interface TokenFile {
  uri: string;
  cdn_uri: string;
  mime: string;
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  token_standard: string;
}

export interface TokenLinks {
  image: string;
}

export interface TokenContent {
  $schema: string;
  json_uri: string;
  files: TokenFile[];
  metadata: TokenMetadata;
  links: TokenLinks;
}

export interface TokenAuthority {
  address: string;
  scopes: string[];
}

export interface TokenCompression {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
}

export interface TokenRoyalty {
  royalty_model: string;
  target: string | null;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
}

export interface TokenOwnership {
  frozen: boolean;
  delegated: boolean;
  delegate: string | null;
  ownership_model: string;
  owner: string;
}

export interface TokenInfo {
  supply: number;
  decimals: number;
  token_program: string;
}

export interface TokenResult {
  interface: string;
  id: string;
  content: TokenContent;
  authorities: TokenAuthority[];
  compression: TokenCompression;
  grouping: any[];
  royalty: TokenRoyalty;
  creators: any[];
  ownership: TokenOwnership;
  supply: number | null;
  mutable: boolean;
  burnt: boolean;
  token_info: TokenInfo;
}

export interface TokenAccount {
  address: string;
  mint: string;
  owner: string;
  amount: number;
  delegated_amount: number;
  frozen: boolean;
}

export interface TokenAccountsResponse {
  total: number;
  limit: number;
  cursor: string;
  token_accounts: TokenAccount[];
}

export type FormattedToken = {
  symbol: string;
  name: string;
  decimals: number;
  logo: string;
};
