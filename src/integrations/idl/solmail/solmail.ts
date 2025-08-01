/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solmail.json`.
 */
export type Solmail = {
  address: "FmrTN4C8NauWrDqz67F6qD3S71Jgvmp94CUy6hXNcjPk";
  metadata: {
    name: "solmail";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Decentralized email with NFT tokenization";
  };
  instructions: [
    {
      name: "cancelBid";
      docs: [
        "Cancel a bid and get refund",
        "ENHANCED: Security validation for cancellation",
      ];
      discriminator: [40, 243, 190, 217, 208, 253, 86, 206];
      accounts: [
        {
          name: "bidAccount";
          writable: true;
        },
        {
          name: "bidder";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "claimUsernameFromBid";
      docs: [
        "Claim username after winning a bid",
        "ENHANCED: Comprehensive validation for claiming",
      ];
      discriminator: [195, 245, 38, 219, 13, 241, 156, 96];
      accounts: [
        {
          name: "bidAccount";
          writable: true;
        },
        {
          name: "usernameAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 110, 97, 109, 101];
              },
              {
                kind: "account";
                path: "bid_account.username";
                account: "bidAccount";
              },
              {
                kind: "account";
                path: "bid_account.domain";
                account: "bidAccount";
              },
            ];
          };
        },
        {
          name: "rateLimit";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 116, 101, 95, 108, 105, 109, 105, 116];
              },
              {
                kind: "account";
                path: "winner";
              },
            ];
          };
        },
        {
          name: "winner";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "createBid";
      docs: [
        "Create a new bid for a username",
        "ENHANCED: Comprehensive validation and security checks",
      ];
      discriminator: [234, 10, 213, 160, 52, 26, 91, 142];
      accounts: [
        {
          name: "bidAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [98, 105, 100];
              },
              {
                kind: "arg";
                path: "username";
              },
              {
                kind: "const";
                value: [115, 111, 108, 46, 109, 97, 105, 108];
              },
            ];
          };
        },
        {
          name: "marketplaceSettings";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115,
                ];
              },
            ];
          };
        },
        {
          name: "usernameAccountCheck";
        },
        {
          name: "bidder";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "username";
          type: "string";
        },
        {
          name: "bidAmount";
          type: "u64";
        },
      ];
    },
    {
      name: "createCollectionMasterEdition";
      docs: ["Create collection master edition - SEPARATE INSTRUCTION"];
      discriminator: [154, 111, 109, 77, 5, 124, 194, 238];
      accounts: [
        {
          name: "centralState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108,
                ];
              },
            ];
          };
        },
        {
          name: "collectionMint";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  53,
                  54,
                  54,
                  53,
                  53,
                  54,
                  95,
                  118,
                  51,
                ];
              },
            ];
          };
        },
        {
          name: "metadataAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: "account";
                path: "metadataProgram";
              },
              {
                kind: "account";
                path: "collectionMint";
              },
            ];
            program: {
              kind: "account";
              path: "metadataProgram";
            };
          };
        },
        {
          name: "masterEdition";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: "account";
                path: "metadataProgram";
              },
              {
                kind: "account";
                path: "collectionMint";
              },
              {
                kind: "const";
                value: [101, 100, 105, 116, 105, 111, 110];
              },
            ];
            program: {
              kind: "account";
              path: "metadataProgram";
            };
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "metadataProgram";
          address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "createCollectionMetadata";
      docs: ["Create collection metadata - SEPARATE INSTRUCTION"];
      discriminator: [246, 165, 159, 126, 15, 178, 235, 83];
      accounts: [
        {
          name: "centralState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108,
                ];
              },
            ];
          };
        },
        {
          name: "collectionMint";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  53,
                  54,
                  54,
                  53,
                  53,
                  54,
                  95,
                  118,
                  51,
                ];
              },
            ];
          };
        },
        {
          name: "metadataAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: "account";
                path: "metadataProgram";
              },
              {
                kind: "account";
                path: "collectionMint";
              },
            ];
            program: {
              kind: "account";
              path: "metadataProgram";
            };
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "metadataProgram";
          address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "createMarketplaceSettings";
      docs: [
        "Create or initialize marketplace settings (admin only)",
        "CRITICAL: Admin-only instruction with enhanced security",
      ];
      discriminator: [174, 138, 103, 248, 14, 225, 33, 204];
      accounts: [
        {
          name: "marketplaceSettings";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115,
                ];
              },
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "paymentEnabled";
          type: "bool";
        },
        {
          name: "minBidLamports";
          type: "u64";
        },
        {
          name: "bidDurationSecs";
          type: "u32";
        },
      ];
    },
    {
      name: "createSolmailCollection";
      docs: [
        "Create Solmail NFT collection (one-time setup) - ENHANCED",
        "ADMIN ONLY - Additional security guard",
      ];
      discriminator: [113, 115, 208, 187, 133, 207, 108, 34];
      accounts: [
        {
          name: "centralState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108,
                ];
              },
            ];
          };
        },
        {
          name: "collectionMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  53,
                  54,
                  54,
                  53,
                  53,
                  54,
                  95,
                  118,
                  51,
                ];
              },
            ];
          };
        },
        {
          name: "centralStateAta";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "centralState";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "collectionMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "createUsername";
      docs: [
        "Create a new username account without mailbox assignment",
        "ENHANCED: Now includes payment gating and comprehensive validation",
      ];
      discriminator: [166, 69, 156, 133, 149, 194, 61, 190];
      accounts: [
        {
          name: "usernameAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114, 110, 97, 109, 101];
              },
              {
                kind: "arg";
                path: "username";
              },
              {
                kind: "const";
                value: [115, 111, 108, 46, 109, 97, 105, 108];
              },
            ];
          };
        },
        {
          name: "rateLimit";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 97, 116, 101, 95, 108, 105, 109, 105, 116];
              },
              {
                kind: "account";
                path: "authority";
              },
            ];
          };
        },
        {
          name: "marketplaceSettings";
          optional: true;
        },
        {
          name: "bidAccountCheck";
          docs: [
            "The seeds constraint ensures this is the correct PDA if it exists",
          ];
          optional: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [98, 105, 100];
              },
              {
                kind: "arg";
                path: "username";
              },
              {
                kind: "const";
                value: [115, 111, 108, 46, 109, 97, 105, 108];
              },
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "username";
          type: "string";
        },
      ];
    },
    {
      name: "createUsernameMint";
      docs: ["Create NFT mint for a specific username"];
      discriminator: [5, 247, 123, 17, 135, 32, 201, 93];
      accounts: [
        {
          name: "centralState";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108,
                ];
              },
            ];
          };
        },
        {
          name: "usernameMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                ];
              },
              {
                kind: "account";
                path: "usernameAccount";
              },
            ];
          };
        },
        {
          name: "usernameAccount";
          docs: ["The username account that will be wrapped"];
        },
        {
          name: "feePayer";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "createmail";
      docs: ["Create mail V2"];
      discriminator: [79, 186, 79, 109, 12, 168, 250, 107];
      accounts: [
        {
          name: "mail";
          writable: true;
          signer: true;
        },
        {
          name: "mailAccountV2";
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "subject";
          type: "string";
        },
        {
          name: "from";
          type: "pubkey";
        },
        {
          name: "to";
          type: "pubkey";
        },
        {
          name: "salt";
          type: "string";
        },
        {
          name: "iv";
          type: "string";
        },
        {
          name: "version";
          type: "string";
        },
        {
          name: "parentId";
          type: "string";
        },
      ];
    },
    {
      name: "editWrappedUsername";
      docs: ["Allow NFT holder to modify wrapped username data"];
      discriminator: [142, 86, 16, 71, 205, 186, 149, 153];
      accounts: [
        {
          name: "usernameAccount";
          writable: true;
        },
        {
          name: "usernameWrapper";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                  95,
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114,
                ];
              },
              {
                kind: "account";
                path: "usernameAccount";
              },
            ];
          };
        },
        {
          name: "nftAccount";
        },
        {
          name: "nftOwner";
          signer: true;
        },
      ];
      args: [
        {
          name: "newMailbox";
          type: {
            option: "pubkey";
          };
        },
      ];
    },
    {
      name: "emergencyPauseMarketplace";
      docs: [
        "Emergency pause for marketplace (admin only)",
        "CRITICAL: Emergency stop functionality",
      ];
      discriminator: [39, 202, 192, 66, 29, 240, 182, 228];
      accounts: [
        {
          name: "marketplaceSettings";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115,
                ];
              },
            ];
          };
        },
        {
          name: "admin";
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "linkMailboxToUsername";
      docs: [
        "Link a mailbox to an existing username",
        "ENHANCED: Additional security validation",
      ];
      discriminator: [233, 178, 23, 214, 77, 169, 52, 35];
      accounts: [
        {
          name: "usernameAccount";
          writable: true;
        },
        {
          name: "mailAccountV2";
        },
        {
          name: "authority";
          signer: true;
        },
      ];
      args: [
        {
          name: "mailbox";
          type: "pubkey";
        },
      ];
    },
    {
      name: "register";
      docs: ["Register mail account V1 (legacy)"];
      discriminator: [211, 124, 67, 15, 211, 194, 178, 240];
      accounts: [
        {
          name: "mailAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 97, 105, 108, 45, 97, 99, 99, 111, 117, 110, 116];
              },
              {
                kind: "account";
                path: "authority";
              },
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "nostrKey";
          type: "string";
        },
      ];
    },
    {
      name: "registerV2";
      docs: ["Register mail account V2"];
      discriminator: [225, 250, 193, 26, 37, 179, 205, 76];
      accounts: [
        {
          name: "mailAccountV2";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  109,
                  97,
                  105,
                  108,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  118,
                  50,
                ];
              },
              {
                kind: "account";
                path: "authority";
              },
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "nostrKey";
          type: "string";
        },
      ];
    },
    {
      name: "rewrapUsername";
      docs: ["Re-wrap a username that was previously unwrapped"];
      discriminator: [142, 184, 154, 88, 103, 179, 176, 223];
      accounts: [
        {
          name: "usernameAccount";
          writable: true;
        },
        {
          name: "usernameWrapper";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                  95,
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114,
                ];
              },
              {
                kind: "account";
                path: "usernameAccount";
              },
            ];
          };
        },
        {
          name: "centralState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108,
                ];
              },
            ];
          };
        },
        {
          name: "usernameMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                ];
              },
              {
                kind: "account";
                path: "usernameAccount";
              },
            ];
          };
        },
        {
          name: "nftDestination";
          writable: true;
        },
        {
          name: "nameOwner";
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
      ];
      args: [
        {
          name: "uri";
          type: "string";
        },
      ];
    },
    {
      name: "sendmail";
      docs: ["Send mail V1 (legacy)"];
      discriminator: [254, 11, 16, 48, 131, 123, 30, 181];
      accounts: [
        {
          name: "mail";
          writable: true;
          signer: true;
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "subject";
          type: "string";
        },
        {
          name: "body";
          type: "string";
        },
        {
          name: "from";
          type: "pubkey";
        },
        {
          name: "to";
          type: "pubkey";
        },
        {
          name: "salt";
          type: "string";
        },
        {
          name: "iv";
          type: "string";
        },
        {
          name: "version";
          type: "string";
        },
      ];
    },
    {
      name: "transferUsernameAuthority";
      docs: [
        "Transfer username authority to a new owner",
        "ENHANCED: Additional security validation",
      ];
      discriminator: [85, 160, 157, 156, 215, 111, 42, 167];
      accounts: [
        {
          name: "usernameAccount";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
      ];
      args: [
        {
          name: "newAuthority";
          type: "pubkey";
        },
      ];
    },
    {
      name: "unlinkMailboxFromUsername";
      docs: ["Unlink mailbox from username"];
      discriminator: [168, 98, 155, 71, 126, 158, 126, 154];
      accounts: [
        {
          name: "usernameAccount";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "unwrapUsername";
      docs: ["Unwrap a username NFT back to a regular username"];
      discriminator: [67, 221, 210, 83, 41, 47, 174, 122];
      accounts: [
        {
          name: "usernameAccount";
          writable: true;
        },
        {
          name: "usernameWrapper";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                  95,
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114,
                ];
              },
              {
                kind: "account";
                path: "usernameAccount";
              },
            ];
          };
        },
        {
          name: "centralState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108,
                ];
              },
            ];
          };
        },
        {
          name: "usernameMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                ];
              },
              {
                kind: "account";
                path: "usernameAccount";
              },
            ];
          };
        },
        {
          name: "nftSource";
          writable: true;
        },
        {
          name: "nftOwner";
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "updateAccountV2";
      docs: ["Update mail account V2"];
      discriminator: [207, 128, 25, 128, 97, 131, 11, 255];
      accounts: [
        {
          name: "mailAccountV2";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
      ];
      args: [
        {
          name: "nostrKey";
          type: "string";
        },
        {
          name: "mailbox";
          type: "pubkey";
        },
      ];
    },
    {
      name: "updateBid";
      docs: [
        "Update an existing bid with a higher amount (outbid)",
        "ENHANCED: Race condition protection and validation",
      ];
      discriminator: [30, 24, 210, 187, 71, 101, 78, 46];
      accounts: [
        {
          name: "bidAccount";
          writable: true;
        },
        {
          name: "marketplaceSettings";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115,
                ];
              },
            ];
          };
        },
        {
          name: "newBidder";
          writable: true;
          signer: true;
        },
        {
          name: "previousBidder";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "newBidAmount";
          type: "u64";
        },
      ];
    },
    {
      name: "updateMarketplaceSettings";
      docs: [
        "Update existing marketplace settings (admin only)",
        "CRITICAL: Admin-only instruction with change tracking",
      ];
      discriminator: [121, 115, 116, 71, 200, 23, 66, 209];
      accounts: [
        {
          name: "marketplaceSettings";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  112,
                  108,
                  97,
                  99,
                  101,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115,
                ];
              },
            ];
          };
        },
        {
          name: "authority";
          signer: true;
        },
      ];
      args: [
        {
          name: "paymentEnabled";
          type: "bool";
        },
        {
          name: "minBidLamports";
          type: "u64";
        },
        {
          name: "bidDurationSecs";
          type: "u32";
        },
      ];
    },
    {
      name: "updatemail";
      docs: ["Update mail V2"];
      discriminator: [103, 89, 239, 89, 179, 196, 168, 188];
      accounts: [
        {
          name: "mail";
          writable: true;
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "body";
          type: "string";
        },
      ];
    },
    {
      name: "updatemaillabel";
      docs: ["Update mail label"];
      discriminator: [127, 96, 27, 207, 164, 210, 203, 16];
      accounts: [
        {
          name: "mail";
          writable: true;
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "label";
          type: "u8";
        },
      ];
    },
    {
      name: "updatemailreadstatus";
      docs: ["Update mail read status"];
      discriminator: [22, 58, 187, 161, 225, 237, 130, 155];
      accounts: [
        {
          name: "mail";
          writable: true;
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "wrapUsername";
      docs: [
        "Wrap a username as an NFT",
        "ENHANCED: Additional validation for NFT operations",
      ];
      discriminator: [59, 94, 211, 65, 20, 41, 98, 102];
      accounts: [
        {
          name: "usernameAccount";
          writable: true;
        },
        {
          name: "usernameWrapper";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                  95,
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  114,
                ];
              },
              {
                kind: "account";
                path: "usernameAccount";
              },
            ];
          };
        },
        {
          name: "centralState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  101,
                  110,
                  116,
                  114,
                  97,
                  108,
                ];
              },
            ];
          };
        },
        {
          name: "usernameMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  119,
                  114,
                  97,
                  112,
                  112,
                  101,
                  100,
                  95,
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101,
                ];
              },
              {
                kind: "account";
                path: "usernameAccount";
              },
            ];
          };
        },
        {
          name: "nftDestination";
          writable: true;
        },
        {
          name: "nameOwner";
          signer: true;
        },
        {
          name: "feePayer";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "uri";
          type: "string";
        },
        {
          name: "mailboxLocked";
          type: "bool";
        },
        {
          name: "transferAllowed";
          type: "bool";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "bidAccount";
      discriminator: [27, 161, 15, 114, 230, 126, 56, 104];
    },
    {
      name: "marketplaceSettings";
      discriminator: [159, 177, 179, 196, 220, 75, 86, 16];
    },
    {
      name: "solMail";
      discriminator: [247, 239, 251, 112, 232, 125, 215, 255];
    },
    {
      name: "solMailAccount";
      discriminator: [72, 22, 32, 1, 49, 244, 46, 180];
    },
    {
      name: "solMailAccountV2";
      discriminator: [56, 165, 134, 52, 94, 16, 21, 14];
    },
    {
      name: "solMailV2";
      discriminator: [138, 97, 203, 217, 101, 227, 70, 35];
    },
    {
      name: "solmailCentralState";
      discriminator: [99, 124, 165, 34, 55, 150, 4, 250];
    },
    {
      name: "userRateLimit";
      discriminator: [156, 245, 156, 195, 8, 43, 139, 184];
    },
    {
      name: "usernameAccount";
      discriminator: [120, 2, 212, 44, 208, 63, 20, 122];
    },
    {
      name: "usernameWrapper";
      discriminator: [178, 242, 111, 106, 198, 168, 204, 135];
    },
  ];
  events: [
    {
      name: "accountValidationFailureEvent";
      discriminator: [188, 44, 79, 214, 125, 10, 106, 208];
    },
    {
      name: "adminActionEvent";
      discriminator: [220, 224, 207, 200, 52, 226, 42, 155];
    },
    {
      name: "bidCancelledEvent";
      discriminator: [149, 225, 90, 15, 245, 141, 102, 145];
    },
    {
      name: "bidCreatedEvent";
      discriminator: [119, 134, 95, 199, 242, 88, 176, 254];
    },
    {
      name: "bidRefundEvent";
      discriminator: [2, 119, 161, 92, 202, 2, 244, 28];
    },
    {
      name: "bidUpdatedEvent";
      discriminator: [234, 172, 58, 147, 27, 189, 244, 211];
    },
    {
      name: "bulkOperationEvent";
      discriminator: [40, 21, 147, 124, 13, 126, 189, 43];
    },
    {
      name: "complianceAuditEvent";
      discriminator: [228, 245, 144, 42, 94, 251, 201, 147];
    },
    {
      name: "financialTransactionEvent";
      discriminator: [53, 189, 58, 212, 96, 94, 55, 149];
    },
    {
      name: "mailAccountV2RegisterEvent";
      discriminator: [250, 87, 69, 103, 135, 185, 177, 156];
    },
    {
      name: "mailAccountV2UpdateEvent";
      discriminator: [239, 63, 234, 251, 172, 161, 13, 162];
    },
    {
      name: "mailSendEvent";
      discriminator: [246, 25, 155, 65, 156, 90, 174, 160];
    },
    {
      name: "mailV2ReadEvent";
      discriminator: [185, 241, 60, 172, 90, 110, 65, 90];
    },
    {
      name: "mailV2SendEvent";
      discriminator: [57, 95, 119, 238, 197, 56, 38, 155];
    },
    {
      name: "mailV2UpdateEvent";
      discriminator: [224, 123, 44, 76, 87, 109, 105, 110];
    },
    {
      name: "mailV2UpdateLabelEvent";
      discriminator: [25, 155, 115, 145, 193, 110, 174, 83];
    },
    {
      name: "marketplaceSettingsCreatedEvent";
      discriminator: [152, 36, 221, 52, 61, 136, 113, 253];
    },
    {
      name: "marketplaceSettingsUpdatedEvent";
      discriminator: [234, 193, 102, 113, 14, 142, 204, 191];
    },
    {
      name: "paymentGatingStatusChangeEvent";
      discriminator: [221, 72, 20, 126, 189, 50, 45, 215];
    },
    {
      name: "performanceMetricEvent";
      discriminator: [82, 84, 133, 45, 159, 49, 192, 79];
    },
    {
      name: "rateLimitResetEvent";
      discriminator: [176, 64, 170, 212, 240, 46, 185, 63];
    },
    {
      name: "rateLimitUpdatedEvent";
      discriminator: [117, 73, 176, 253, 21, 69, 103, 117];
    },
    {
      name: "rateLimitViolationEvent";
      discriminator: [199, 192, 66, 0, 33, 53, 176, 250];
    },
    {
      name: "securityViolationEvent";
      discriminator: [29, 75, 145, 217, 70, 44, 39, 128];
    },
    {
      name: "solmailCollectionCreatedEvent";
      discriminator: [135, 188, 144, 234, 67, 63, 236, 246];
    },
    {
      name: "systemStateChangeEvent";
      discriminator: [191, 208, 175, 241, 211, 36, 249, 116];
    },
    {
      name: "usernameAuthorityTransferredEvent";
      discriminator: [169, 128, 164, 236, 203, 67, 147, 221];
    },
    {
      name: "usernameClaimedFromBidEvent";
      discriminator: [232, 32, 52, 189, 10, 218, 82, 161];
    },
    {
      name: "usernameCreatedEvent";
      discriminator: [186, 17, 123, 213, 3, 164, 96, 224];
    },
    {
      name: "usernameMailboxLinkedEvent";
      discriminator: [103, 167, 212, 13, 44, 26, 130, 58];
    },
    {
      name: "usernameMailboxUnlinkedEvent";
      discriminator: [239, 51, 123, 120, 149, 77, 191, 251];
    },
    {
      name: "usernameNftMintCreatedEvent";
      discriminator: [57, 71, 33, 4, 156, 206, 5, 153];
    },
    {
      name: "usernameReservationEvent";
      discriminator: [14, 173, 124, 121, 169, 116, 193, 18];
    },
    {
      name: "usernameRewrappedEvent";
      discriminator: [1, 248, 89, 41, 168, 31, 225, 86];
    },
    {
      name: "usernameUnwrappedEvent";
      discriminator: [161, 205, 89, 209, 242, 30, 250, 58];
    },
    {
      name: "usernameWrappedEvent";
      discriminator: [200, 217, 249, 41, 22, 254, 111, 128];
    },
    {
      name: "wrappedUsernameMailboxChangedEvent";
      discriminator: [0, 207, 103, 166, 125, 16, 13, 185];
    },
    {
      name: "wrapperFundsWithdrawnEvent";
      discriminator: [193, 131, 79, 12, 105, 71, 36, 110];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "invalidInstruction";
      msg: "Invalid instruction";
    },
    {
      code: 6001;
      name: "invalidBody";
      msg: "The body of your email is too long. The max is 512 chars";
    },
    {
      code: 6002;
      name: "invalidSubject";
      msg: "The subject of your email is too long. The max is 40 chars";
    },
    {
      code: 6003;
      name: "invalidSalt";
      msg: "The salt should be exactly 16 chars";
    },
    {
      code: 6004;
      name: "invalidIv";
      msg: "The IV should be exactly 32 chars";
    },
    {
      code: 6005;
      name: "invalidDiffie";
      msg: "The diffie publickey should be exactly 64 chars";
    },
    {
      code: 6006;
      name: "invalidDestination";
      msg: "From and to address should not be same";
    },
    {
      code: 6007;
      name: "invalidSource";
      msg: "Signer and from address should be same";
    },
    {
      code: 6008;
      name: "unauthorized";
      msg: "Unauthorized access";
    },
    {
      code: 6009;
      name: "unauthorizedSigner";
      msg: "Unauthorized signer";
    },
    {
      code: 6010;
      name: "invalidLabel";
      msg: "Invalid label";
    },
    {
      code: 6011;
      name: "invalidMailAccount";
      msg: "Invalid mailaccount";
    },
    {
      code: 6012;
      name: "usernameAlreadyExists";
      msg: "Username already exists";
    },
    {
      code: 6013;
      name: "invalidUsername";
      msg: "Invalid username - must be 3-32 characters, alphanumeric and underscores only";
    },
    {
      code: 6014;
      name: "usernameNotFound";
      msg: "Username not found";
    },
    {
      code: 6015;
      name: "usernameAlreadyWrapped";
      msg: "Username is already wrapped as NFT";
    },
    {
      code: 6016;
      name: "usernameNotWrapped";
      msg: "Username is not wrapped";
    },
    {
      code: 6017;
      name: "cannotModifyWrappedUsername";
      msg: "Cannot modify wrapped username - unwrap first";
    },
    {
      code: 6018;
      name: "invalidNewAuthority";
      msg: "Invalid new authority";
    },
    {
      code: 6019;
      name: "invalidMailbox";
      msg: "Invalid mailbox";
    },
    {
      code: 6020;
      name: "wrapperAlreadyExists";
      msg: "Wrapper already exists for this username";
    },
    {
      code: 6021;
      name: "wrapperNotFound";
      msg: "Wrapper not found";
    },
    {
      code: 6022;
      name: "wrapperNotActive";
      msg: "Wrapper is not active";
    },
    {
      code: 6023;
      name: "invalidWrapperState";
      msg: "Invalid wrapper state";
    },
    {
      code: 6024;
      name: "nftMintMismatch";
      msg: "NFT mint mismatch";
    },
    {
      code: 6025;
      name: "invalidNftAmount";
      msg: "Invalid NFT amount - must be exactly 1";
    },
    {
      code: 6026;
      name: "invalidCollectionMint";
      msg: "Invalid collection mint";
    },
    {
      code: 6027;
      name: "collectionNotVerified";
      msg: "Collection not verified";
    },
    {
      code: 6028;
      name: "invalidMetadataAccount";
      msg: "Invalid metadata account";
    },
    {
      code: 6029;
      name: "metadataCreationFailed";
      msg: "Metadata creation failed";
    },
    {
      code: 6030;
      name: "usernameLockedForModifications";
      msg: "Username is locked for modifications";
    },
    {
      code: 6031;
      name: "nftTransferNotAllowed";
      msg: "NFT transfer not allowed";
    },
    {
      code: 6032;
      name: "invalidOriginalAuthority";
      msg: "Invalid original authority";
    },
    {
      code: 6033;
      name: "centralStateNotInitialized";
      msg: "Central state not initialized";
    },
    {
      code: 6034;
      name: "invalidCentralState";
      msg: "Invalid central state";
    },
    {
      code: 6035;
      name: "usernameAlreadyHasMailbox";
      msg: "Username already has a linked mailbox";
    },
    {
      code: 6036;
      name: "usernameNoMailbox";
      msg: "Username does not have a linked mailbox";
    },
    {
      code: 6037;
      name: "invalidMailboxAccount";
      msg: "Mailbox account does not exist or is invalid";
    },
    {
      code: 6038;
      name: "cannotLinkMailboxToWrappedUsername";
      msg: "Cannot link mailbox to wrapped username";
    },
    {
      code: 6039;
      name: "cannotUnlinkMailboxFromWrappedUsername";
      msg: "Cannot unlink mailbox from wrapped username";
    },
    {
      code: 6040;
      name: "usernameMustHaveNoMailboxBeforeWrapping";
      msg: "Username must have no mailbox before wrapping";
    },
    {
      code: 6041;
      name: "mailboxOperationsLocked";
      msg: "Mailbox operations are locked for this wrapped username";
    },
    {
      code: 6042;
      name: "rateLimitExceeded";
      msg: "Rate limit exceeded: too many usernames created in time window";
    },
    {
      code: 6043;
      name: "rateLimitTooFrequent";
      msg: "Rate limit exceeded: creation too frequent, please wait";
    },
    {
      code: 6044;
      name: "invalidRateLimit";
      msg: "Invalid rate limit account";
    },
    {
      code: 6045;
      name: "accountNotInitialized";
      msg: "Account not initialized or has invalid discriminator";
    },
    {
      code: 6046;
      name: "usernameInBiddingPeriod";
      msg: "Username is currently in bidding period";
    },
    {
      code: 6047;
      name: "paymentGatingEnabled";
      msg: "Payment gating is enabled - must use bidding system";
    },
    {
      code: 6048;
      name: "bidTooLow";
      msg: "Bid amount is below minimum required";
    },
    {
      code: 6049;
      name: "bidNotHigherThanCurrent";
      msg: "Bid amount must be higher than current highest bid";
    },
    {
      code: 6050;
      name: "bidNotExpired";
      msg: "Bid has not expired yet - cannot claim username";
    },
    {
      code: 6051;
      name: "notHighestBidder";
      msg: "You are not the highest bidder";
    },
    {
      code: 6052;
      name: "marketplaceNotInitialized";
      msg: "Marketplace settings not initialized";
    },
    {
      code: 6053;
      name: "invalidMarketplaceSettings";
      msg: "Invalid marketplace settings";
    },
    {
      code: 6054;
      name: "bidAccountNotFound";
      msg: "Bid account not found";
    },
    {
      code: 6055;
      name: "bidAccountNotActive";
      msg: "Bid account is not active";
    },
    {
      code: 6056;
      name: "cannotBidOnOwnBid";
      msg: "Cannot bid on your own bid";
    },
    {
      code: 6057;
      name: "bidAlreadyExpired";
      msg: "Bid has already expired";
    },
    {
      code: 6058;
      name: "usernameAlreadyHasBid";
      msg: "Username already has an active bid";
    },
    {
      code: 6059;
      name: "cannotCancelBid";
      msg: "Cannot cancel bid - you are not the bidder";
    },
    {
      code: 6060;
      name: "insufficientFundsForBid";
      msg: "Insufficient funds for bid";
    },
    {
      code: 6061;
      name: "invalidBidDuration";
      msg: "Invalid bid duration";
    },
    {
      code: 6062;
      name: "marketplaceAuthorityMismatch";
      msg: "Marketplace authority mismatch";
    },
    {
      code: 6063;
      name: "usernameHasActiveBid";
      msg: "Username has active bid - cannot create directly";
    },
    {
      code: 6064;
      name: "paymentRequired";
      msg: "Payment required - marketplace has payment gating enabled";
    },
    {
      code: 6065;
      name: "invalidPreviousBidder";
      msg: "Invalid previous bidder";
    },
    {
      code: 6066;
      name: "arithmeticOverflow";
      msg: "Arithmetic overflow";
    },
    {
      code: 6067;
      name: "invalidBidAccountState";
      msg: "Invalid bid account state";
    },
    {
      code: 6068;
      name: "insufficientAccountBalance";
      msg: "Insufficient account balance";
    },
    {
      code: 6069;
      name: "bidAmountTooHigh";
      msg: "Bid amount exceeds maximum allowed";
    },
    {
      code: 6070;
      name: "invalidDomainAccount";
      msg: "Invalid domain account";
    },
    {
      code: 6071;
      name: "invalidUsernameCharacters";
      msg: "Username contains invalid characters";
    },
    {
      code: 6072;
      name: "usernameReserved";
      msg: "Username is reserved and cannot be used";
    },
    {
      code: 6073;
      name: "accountSpaceError";
      msg: "Account space calculation error";
    },
    {
      code: 6074;
      name: "invalidBumpSeed";
      msg: "Invalid account bump seed";
    },
    {
      code: 6075;
      name: "accountDeserializationFailed";
      msg: "Account deserialization failed";
    },
    {
      code: 6076;
      name: "invalidAccountDiscriminator";
      msg: "Invalid account discriminator";
    },
    {
      code: 6077;
      name: "invalidTimestamp";
      msg: "Clock drift detected - invalid timestamp";
    },
    {
      code: 6078;
      name: "rentCalculationFailed";
      msg: "Rent calculation failed";
    },
    {
      code: 6079;
      name: "invalidInstructionData";
      msg: "Invalid instruction data";
    },
    {
      code: 6080;
      name: "securityViolation";
      msg: "Security violation detected";
    },
    {
      code: 6081;
      name: "invalidAccountOwner";
      msg: "Invalid account owner";
    },
    {
      code: 6082;
      name: "accountClosureNotPermitted";
      msg: "Account closure not permitted";
    },
    {
      code: 6083;
      name: "invalidAccountState";
      msg: "Invalid account state or data";
    },
  ];
  types: [
    {
      name: "accountValidationFailureEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "account";
            type: "pubkey";
          },
          {
            name: "validationType";
            type: "string";
          },
          {
            name: "failureReason";
            type: "string";
          },
          {
            name: "detectedAt";
            type: "u32";
          },
          {
            name: "userInvolved";
            type: {
              option: "pubkey";
            };
          },
        ];
      };
    },
    {
      name: "adminActionEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "actionType";
            type: "string";
          },
          {
            name: "targetAccount";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "targetUser";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "actionData";
            type: "string";
          },
          {
            name: "executedAt";
            type: "u32";
          },
          {
            name: "reason";
            type: "string";
          },
        ];
      };
    },
    {
      name: "bidAccount";
      docs: [
        "Bid Account - Holds active bid information for a specific username",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "currentHighestBidder";
            type: "pubkey";
          },
          {
            name: "bidAmount";
            type: "u64";
          },
          {
            name: "bidExpiration";
            type: "u32";
          },
          {
            name: "isActive";
            type: "bool";
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "bidCancelledEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "bidder";
            type: "pubkey";
          },
          {
            name: "refundAmount";
            type: "u64";
          },
          {
            name: "bidAccount";
            type: "pubkey";
          },
          {
            name: "cancelledAt";
            type: "u32";
          },
          {
            name: "timeRemaining";
            type: "u32";
          },
          {
            name: "cancellationReason";
            type: "string";
          },
        ];
      };
    },
    {
      name: "bidCreatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "bidder";
            type: "pubkey";
          },
          {
            name: "bidAmount";
            type: "u64";
          },
          {
            name: "bidExpiration";
            type: "u32";
          },
          {
            name: "bidAccount";
            type: "pubkey";
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "marketplaceSettings";
            type: "pubkey";
          },
          {
            name: "minBidAtCreation";
            type: "u64";
          },
          {
            name: "bidderBalanceBefore";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "bidRefundEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "refundedBidder";
            type: "pubkey";
          },
          {
            name: "refundAmount";
            type: "u64";
          },
          {
            name: "newHighestBidder";
            type: "pubkey";
          },
          {
            name: "bidAccount";
            type: "pubkey";
          },
          {
            name: "refundedAt";
            type: "u32";
          },
          {
            name: "refundTransactionFee";
            type: "u64";
          },
          {
            name: "refundSuccess";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "bidUpdatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "previousBidder";
            type: "pubkey";
          },
          {
            name: "newBidder";
            type: "pubkey";
          },
          {
            name: "previousAmount";
            type: "u64";
          },
          {
            name: "newAmount";
            type: "u64";
          },
          {
            name: "bidExpiration";
            type: "u32";
          },
          {
            name: "bidAccount";
            type: "pubkey";
          },
          {
            name: "updatedAt";
            type: "u32";
          },
          {
            name: "amountIncrease";
            type: "u64";
          },
          {
            name: "newBidderBalanceBefore";
            type: "u64";
          },
          {
            name: "timeRemainingBeforeUpdate";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "bulkOperationEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "operationType";
            type: "string";
          },
          {
            name: "initiatedBy";
            type: "pubkey";
          },
          {
            name: "startedAt";
            type: "u32";
          },
          {
            name: "completedAt";
            type: "u32";
          },
          {
            name: "totalOperations";
            type: "u32";
          },
          {
            name: "successfulOperations";
            type: "u32";
          },
          {
            name: "failedOperations";
            type: "u32";
          },
          {
            name: "totalAmountProcessed";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "complianceAuditEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "auditType";
            type: "string";
          },
          {
            name: "auditResult";
            type: "string";
          },
          {
            name: "auditedAccount";
            type: "pubkey";
          },
          {
            name: "auditedBy";
            type: "string";
          },
          {
            name: "auditedAt";
            type: "u32";
          },
          {
            name: "findings";
            type: "string";
          },
          {
            name: "remediationRequired";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "financialTransactionEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "transactionType";
            type: "string";
          },
          {
            name: "fromAccount";
            type: "pubkey";
          },
          {
            name: "toAccount";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "success";
            type: "bool";
          },
          {
            name: "executedAt";
            type: "u32";
          },
          {
            name: "relatedUsername";
            type: {
              option: "string";
            };
          },
          {
            name: "transactionFee";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "mailAccountV2RegisterEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "account";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "mailAccountV2UpdateEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "account";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "mailLabel";
      repr: {
        kind: "rust";
      };
      type: {
        kind: "enum";
        variants: [
          {
            name: "outbox";
          },
          {
            name: "inbox";
          },
          {
            name: "read";
          },
          {
            name: "trash";
          },
          {
            name: "spam";
          },
        ];
      };
    },
    {
      name: "mailSendEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "from";
            type: "pubkey";
          },
          {
            name: "to";
            type: "pubkey";
          },
          {
            name: "id";
            type: "string";
          },
        ];
      };
    },
    {
      name: "mailV2ReadEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "owner";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "mailV2SendEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "from";
            type: "pubkey";
          },
          {
            name: "to";
            type: "pubkey";
          },
          {
            name: "id";
            type: "string";
          },
          {
            name: "mailbox";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "mailV2UpdateEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "from";
            type: "pubkey";
          },
          {
            name: "to";
            type: "pubkey";
          },
          {
            name: "id";
            type: "string";
          },
          {
            name: "mailbox";
            type: "pubkey";
          },
          {
            name: "parentId";
            type: "string";
          },
          {
            name: "markAsRead";
            type: "bool";
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "subject";
            type: "string";
          },
          {
            name: "body";
            type: "string";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "iv";
            type: "string";
          },
          {
            name: "salt";
            type: "string";
          },
          {
            name: "version";
            type: "string";
          },
        ];
      };
    },
    {
      name: "mailV2UpdateLabelEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "owner";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "marketplaceSettings";
      docs: ["Marketplace Settings - Global configuration for bidding system"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "paymentEnabled";
            type: "bool";
          },
          {
            name: "minBidLamports";
            type: "u64";
          },
          {
            name: "bidDurationSecs";
            type: "u32";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "marketplaceSettingsCreatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "marketplaceSettings";
            type: "pubkey";
          },
          {
            name: "paymentEnabled";
            type: "bool";
          },
          {
            name: "minBidLamports";
            type: "u64";
          },
          {
            name: "bidDurationSecs";
            type: "u32";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "createdBy";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "marketplaceSettingsUpdatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "marketplaceSettings";
            type: "pubkey";
          },
          {
            name: "paymentEnabled";
            type: "bool";
          },
          {
            name: "minBidLamports";
            type: "u64";
          },
          {
            name: "bidDurationSecs";
            type: "u32";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "updatedAt";
            type: "u32";
          },
          {
            name: "updatedBy";
            type: "pubkey";
          },
          {
            name: "previousPaymentEnabled";
            type: "bool";
          },
          {
            name: "previousMinBidLamports";
            type: "u64";
          },
          {
            name: "previousBidDurationSecs";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "paymentGatingStatusChangeEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "previousStatus";
            type: "bool";
          },
          {
            name: "newStatus";
            type: "bool";
          },
          {
            name: "changedBy";
            type: "pubkey";
          },
          {
            name: "changedAt";
            type: "u32";
          },
          {
            name: "affectedPendingBids";
            type: "u32";
          },
          {
            name: "newMinBid";
            type: "u64";
          },
          {
            name: "newDuration";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "performanceMetricEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "metricType";
            type: "string";
          },
          {
            name: "metricValue";
            type: "u64";
          },
          {
            name: "measuredAt";
            type: "u32";
          },
          {
            name: "context";
            type: "string";
          },
          {
            name: "thresholdExceeded";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "rateLimitResetEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "previousCount";
            type: "u16";
          },
          {
            name: "newWindowStart";
            type: "u32";
          },
          {
            name: "resetAt";
            type: "u32";
          },
          {
            name: "resetReason";
            type: "string";
          },
        ];
      };
    },
    {
      name: "rateLimitUpdatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "creationCount";
            type: "u16";
          },
          {
            name: "windowStart";
            type: "u32";
          },
          {
            name: "lastCreationTime";
            type: "u32";
          },
          {
            name: "updatedAt";
            type: "u32";
          },
          {
            name: "triggerReason";
            type: "string";
          },
        ];
      };
    },
    {
      name: "rateLimitViolationEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "violationType";
            type: "string";
          },
          {
            name: "currentCount";
            type: "u16";
          },
          {
            name: "timeUntilNextAllowed";
            type: "u32";
          },
          {
            name: "attemptedAt";
            type: "u32";
          },
          {
            name: "attemptedUsername";
            type: "string";
          },
        ];
      };
    },
    {
      name: "securityViolationEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "violator";
            type: "pubkey";
          },
          {
            name: "violationType";
            type: "string";
          },
          {
            name: "severity";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "detectedAt";
            type: "u32";
          },
          {
            name: "accountInvolved";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "instructionInvolved";
            type: "string";
          },
        ];
      };
    },
    {
      name: "solMail";
      type: {
        kind: "struct";
        fields: [
          {
            name: "from";
            type: "pubkey";
          },
          {
            name: "to";
            type: "pubkey";
          },
          {
            name: "id";
            type: "string";
          },
          {
            name: "parentId";
            type: "string";
          },
          {
            name: "markAsRead";
            type: "bool";
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "subject";
            type: "string";
          },
          {
            name: "body";
            type: "string";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "iv";
            type: "string";
          },
          {
            name: "salt";
            type: "string";
          },
          {
            name: "version";
            type: "string";
          },
        ];
      };
    },
    {
      name: "solMailAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "nostrKey";
            type: "string";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "solMailAccountV2";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "mailbox";
            type: "pubkey";
          },
          {
            name: "nostrKey";
            type: "string";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "solMailV2";
      type: {
        kind: "struct";
        fields: [
          {
            name: "from";
            type: "pubkey";
          },
          {
            name: "to";
            type: "pubkey";
          },
          {
            name: "markAsRead";
            type: "bool";
          },
          {
            name: "label";
            type: {
              defined: {
                name: "mailLabel";
              };
            };
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "mailbox";
            type: "pubkey";
          },
          {
            name: "id";
            type: "string";
          },
          {
            name: "parentId";
            type: "string";
          },
          {
            name: "subject";
            type: "string";
          },
          {
            name: "body";
            type: "string";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "iv";
            type: "string";
          },
          {
            name: "salt";
            type: "string";
          },
          {
            name: "version";
            type: "string";
          },
        ];
      };
    },
    {
      name: "solmailCentralState";
      docs: ["Central State for managing collection and program authority"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "tag";
            type: "u8";
          },
          {
            name: "collectionMint";
            type: "pubkey";
          },
          {
            name: "totalWrapped";
            type: "u64";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "solmailCollectionCreatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "collectionMint";
            type: "pubkey";
          },
          {
            name: "centralState";
            type: "pubkey";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "createdAt";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "systemStateChangeEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "changeType";
            type: "string";
          },
          {
            name: "previousState";
            type: "string";
          },
          {
            name: "newState";
            type: "string";
          },
          {
            name: "changedBy";
            type: "pubkey";
          },
          {
            name: "changedAt";
            type: "u32";
          },
          {
            name: "affectedUsersCount";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "userRateLimit";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "lastCreationTime";
            type: "u32";
          },
          {
            name: "creationCount";
            type: "u16";
          },
          {
            name: "windowStart";
            type: "u32";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "usernameAccount";
      docs: [
        "Username Account structure (PDA-based) - FIXED space calculation",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "mailbox";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "domainAccount";
            type: "pubkey";
          },
          {
            name: "isWrapped";
            type: "bool";
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "usernameAuthorityTransferredEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "oldAuthority";
            type: "pubkey";
          },
          {
            name: "newAuthority";
            type: "pubkey";
          },
          {
            name: "transferredAt";
            type: "u32";
          },
          {
            name: "usernameAccount";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "usernameClaimedFromBidEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "winner";
            type: "pubkey";
          },
          {
            name: "winningBid";
            type: "u64";
          },
          {
            name: "usernameAccount";
            type: "pubkey";
          },
          {
            name: "bidAccount";
            type: "pubkey";
          },
          {
            name: "claimedAt";
            type: "u32";
          },
          {
            name: "bidDurationActual";
            type: "u32";
          },
          {
            name: "totalBidCount";
            type: "u16";
          },
          {
            name: "finalBidderCount";
            type: "u16";
          },
          {
            name: "marketplaceRevenue";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "usernameCreatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "usernameAccount";
            type: "pubkey";
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "creationMethod";
            type: "string";
          },
        ];
      };
    },
    {
      name: "usernameMailboxLinkedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "usernameAccount";
            type: "pubkey";
          },
          {
            name: "mailbox";
            type: "pubkey";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "linkedAt";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "usernameMailboxUnlinkedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "usernameAccount";
            type: "pubkey";
          },
          {
            name: "previousMailbox";
            type: "pubkey";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "unlinkedAt";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "usernameNftMintCreatedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "usernameAccount";
            type: "pubkey";
          },
          {
            name: "nftMint";
            type: "pubkey";
          },
          {
            name: "feePayer";
            type: "pubkey";
          },
          {
            name: "createdAt";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "usernameReservationEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "reservationType";
            type: "string";
          },
          {
            name: "reservedBy";
            type: "pubkey";
          },
          {
            name: "reservedAt";
            type: "u32";
          },
          {
            name: "expiration";
            type: {
              option: "u32";
            };
          },
          {
            name: "associatedAccount";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "usernameRewrappedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "wrapperAccount";
            type: "pubkey";
          },
          {
            name: "rewrappedAt";
            type: "u32";
          },
          {
            name: "nftMint";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "usernameUnwrappedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "redeemer";
            type: "pubkey";
          },
          {
            name: "originalAuthority";
            type: "pubkey";
          },
          {
            name: "wrapperAccount";
            type: "pubkey";
          },
          {
            name: "unwrappedAt";
            type: "u32";
          },
          {
            name: "nftMint";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "usernameWrappedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "nftMint";
            type: "pubkey";
          },
          {
            name: "wrapperAccount";
            type: "pubkey";
          },
          {
            name: "nftDestination";
            type: "pubkey";
          },
          {
            name: "previousMailbox";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "wrappedAt";
            type: "u32";
          },
          {
            name: "mailboxLocked";
            type: "bool";
          },
          {
            name: "transferAllowed";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "usernameWrapper";
      docs: [
        "Username Wrapper - PDA that holds username authority during tokenization",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "tag";
            type: {
              defined: {
                name: "wrapperTag";
              };
            };
          },
          {
            name: "nonce";
            type: "u8";
          },
          {
            name: "usernameAccount";
            type: "pubkey";
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "nftMint";
            type: "pubkey";
          },
          {
            name: "originalAuthority";
            type: "pubkey";
          },
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "createdAt";
            type: "u32";
          },
          {
            name: "mailboxLocked";
            type: "bool";
          },
          {
            name: "transferAllowed";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "wrappedUsernameMailboxChangedEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "username";
            type: "string";
          },
          {
            name: "domain";
            type: "string";
          },
          {
            name: "nftOwner";
            type: "pubkey";
          },
          {
            name: "oldMailbox";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "newMailbox";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "changedAt";
            type: "u32";
          },
          {
            name: "wrapperAccount";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "wrapperFundsWithdrawnEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "wrapperAccount";
            type: "pubkey";
          },
          {
            name: "recipient";
            type: "pubkey";
          },
          {
            name: "splAmount";
            type: "u64";
          },
          {
            name: "solAmount";
            type: "u64";
          },
          {
            name: "withdrawnAt";
            type: "u32";
          },
          {
            name: "withdrawnBy";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "wrapperTag";
      docs: ["Wrapper state tags for tracking tokenization status"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "uninitialized";
          },
          {
            name: "activeWrapper";
          },
          {
            name: "inactiveWrapper";
          },
        ];
      };
    },
  ];
};
