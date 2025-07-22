/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solmail.json`.
 */
export type Solmail = {
  "address": "2K15sf3PgSjsxHfpa1hc7qJycReXKS2JZSRXWoaB6S8Q",
  "metadata": {
    "name": "solmail",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Decentralized email with NFT tokenization"
  },
  "instructions": [
    {
      "name": "createSolmailCollection",
      "docs": [
        "Create Solmail NFT collection (one-time setup)"
      ],
      "discriminator": [
        113,
        115,
        208,
        187,
        133,
        207,
        108,
        34
      ],
      "accounts": [
        {
          "name": "centralState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "collectionMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "centralStateAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "centralState"
              },
              {
                "kind": "const",
                "value": [
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
                  169
                ]
              },
              {
                "kind": "account",
                "path": "collectionMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
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
                89
              ]
            }
          }
        },
        {
          "name": "metadataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "masterEdition",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              },
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createUsername",
      "docs": [
        "Create a new username account (PDA-based)"
      ],
      "discriminator": [
        166,
        69,
        156,
        133,
        149,
        194,
        61,
        190
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  110,
                  97,
                  109,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "username"
              },
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  46,
                  109,
                  97,
                  105,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "mailbox",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "createUsernameMint",
      "docs": [
        "Create NFT mint for a specific username"
      ],
      "discriminator": [
        5,
        247,
        123,
        17,
        135,
        32,
        201,
        93
      ],
      "accounts": [
        {
          "name": "centralState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "usernameMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  101
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "usernameAccount",
          "docs": [
            "The username account that will be wrapped"
          ]
        },
        {
          "name": "feePayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createmail",
      "discriminator": [
        79,
        186,
        79,
        109,
        12,
        168,
        250,
        107
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true,
          "signer": true
        },
        {
          "name": "mailAccountV2"
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "subject",
          "type": "string"
        },
        {
          "name": "from",
          "type": "pubkey"
        },
        {
          "name": "to",
          "type": "pubkey"
        },
        {
          "name": "salt",
          "type": "string"
        },
        {
          "name": "iv",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        },
        {
          "name": "parentId",
          "type": "string"
        }
      ]
    },
    {
      "name": "editWrappedUsername",
      "docs": [
        "Allow NFT holder to modify wrapped username data"
      ],
      "discriminator": [
        142,
        86,
        16,
        71,
        205,
        186,
        149,
        153
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "usernameWrapper",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  114
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "nftAccount"
        },
        {
          "name": "nftOwner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newMailbox",
          "type": {
            "option": "pubkey"
          }
        }
      ]
    },
    {
      "name": "linkUsernameToMailbox",
      "docs": [
        "Link username to a new mailbox"
      ],
      "discriminator": [
        231,
        199,
        253,
        145,
        106,
        184,
        225,
        211
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newMailbox",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "register",
      "discriminator": [
        211,
        124,
        67,
        15,
        211,
        194,
        178,
        240
      ],
      "accounts": [
        {
          "name": "mailAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  116
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "nostrKey",
          "type": "string"
        }
      ]
    },
    {
      "name": "registerV2",
      "discriminator": [
        225,
        250,
        193,
        26,
        37,
        179,
        205,
        76
      ],
      "accounts": [
        {
          "name": "mailAccountV2",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  50
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "nostrKey",
          "type": "string"
        }
      ]
    },
    {
      "name": "rewrapUsername",
      "docs": [
        "Re-wrap a username that was previously unwrapped"
      ],
      "discriminator": [
        142,
        184,
        154,
        88,
        103,
        179,
        176,
        223
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "usernameWrapper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  114
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "centralState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "usernameMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  101
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "nftDestination",
          "writable": true
        },
        {
          "name": "nameOwner",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "sendmail",
      "discriminator": [
        254,
        11,
        16,
        48,
        131,
        123,
        30,
        181
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "subject",
          "type": "string"
        },
        {
          "name": "body",
          "type": "string"
        },
        {
          "name": "from",
          "type": "pubkey"
        },
        {
          "name": "to",
          "type": "pubkey"
        },
        {
          "name": "salt",
          "type": "string"
        },
        {
          "name": "iv",
          "type": "string"
        },
        {
          "name": "version",
          "type": "string"
        }
      ]
    },
    {
      "name": "transferUsernameAuthority",
      "docs": [
        "Transfer username authority to a new owner"
      ],
      "discriminator": [
        85,
        160,
        157,
        156,
        215,
        111,
        42,
        167
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "unwrapUsername",
      "docs": [
        "Unwrap a username NFT back to a regular username"
      ],
      "discriminator": [
        67,
        221,
        210,
        83,
        41,
        47,
        174,
        122
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "usernameWrapper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  114
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "centralState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "usernameMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  101
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "nftSource",
          "writable": true
        },
        {
          "name": "nftOwner",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateAccountV2",
      "discriminator": [
        207,
        128,
        25,
        128,
        97,
        131,
        11,
        255
      ],
      "accounts": [
        {
          "name": "mailAccountV2",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "nostrKey",
          "type": "string"
        },
        {
          "name": "mailbox",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updatemail",
      "discriminator": [
        103,
        89,
        239,
        89,
        179,
        196,
        168,
        188
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "body",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatemaillabel",
      "discriminator": [
        127,
        96,
        27,
        207,
        164,
        210,
        203,
        16
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "label",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatemailreadstatus",
      "discriminator": [
        22,
        58,
        187,
        161,
        225,
        237,
        130,
        155
      ],
      "accounts": [
        {
          "name": "mail",
          "writable": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "wrapUsername",
      "docs": [
        "Wrap a username as an NFT"
      ],
      "discriminator": [
        59,
        94,
        211,
        65,
        20,
        41,
        98,
        102
      ],
      "accounts": [
        {
          "name": "usernameAccount",
          "writable": true
        },
        {
          "name": "usernameWrapper",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  114
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "centralState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "usernameMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  101
                ]
              },
              {
                "kind": "account",
                "path": "usernameAccount"
              }
            ]
          }
        },
        {
          "name": "collectionMint",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  109,
                  97,
                  105,
                  108,
                  95,
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "nftDestination",
          "writable": true
        },
        {
          "name": "metadataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "usernameMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "collectionMetadata",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "collectionMasterEdition",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "metadataProgram"
              },
              {
                "kind": "account",
                "path": "collectionMint"
              },
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "metadataProgram"
            }
          }
        },
        {
          "name": "nameOwner",
          "signer": true
        },
        {
          "name": "feePayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "metadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "mailboxLocked",
          "type": "bool"
        },
        {
          "name": "transferAllowed",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "solMail",
      "discriminator": [
        247,
        239,
        251,
        112,
        232,
        125,
        215,
        255
      ]
    },
    {
      "name": "solMailAccount",
      "discriminator": [
        72,
        22,
        32,
        1,
        49,
        244,
        46,
        180
      ]
    },
    {
      "name": "solMailAccountV2",
      "discriminator": [
        56,
        165,
        134,
        52,
        94,
        16,
        21,
        14
      ]
    },
    {
      "name": "solMailV2",
      "discriminator": [
        138,
        97,
        203,
        217,
        101,
        227,
        70,
        35
      ]
    },
    {
      "name": "solmailCentralState",
      "discriminator": [
        99,
        124,
        165,
        34,
        55,
        150,
        4,
        250
      ]
    },
    {
      "name": "usernameAccount",
      "discriminator": [
        120,
        2,
        212,
        44,
        208,
        63,
        20,
        122
      ]
    },
    {
      "name": "usernameWrapper",
      "discriminator": [
        178,
        242,
        111,
        106,
        198,
        168,
        204,
        135
      ]
    }
  ],
  "events": [
    {
      "name": "mailAccountV2RegisterEvent",
      "discriminator": [
        250,
        87,
        69,
        103,
        135,
        185,
        177,
        156
      ]
    },
    {
      "name": "mailAccountV2UpdateEvent",
      "discriminator": [
        239,
        63,
        234,
        251,
        172,
        161,
        13,
        162
      ]
    },
    {
      "name": "mailSendEvent",
      "discriminator": [
        246,
        25,
        155,
        65,
        156,
        90,
        174,
        160
      ]
    },
    {
      "name": "mailV2ReadEvent",
      "discriminator": [
        185,
        241,
        60,
        172,
        90,
        110,
        65,
        90
      ]
    },
    {
      "name": "mailV2SendEvent",
      "discriminator": [
        57,
        95,
        119,
        238,
        197,
        56,
        38,
        155
      ]
    },
    {
      "name": "mailV2UpdateEvent",
      "discriminator": [
        224,
        123,
        44,
        76,
        87,
        109,
        105,
        110
      ]
    },
    {
      "name": "mailV2UpdateLabelEvent",
      "discriminator": [
        25,
        155,
        115,
        145,
        193,
        110,
        174,
        83
      ]
    },
    {
      "name": "solmailCollectionCreatedEvent",
      "discriminator": [
        135,
        188,
        144,
        234,
        67,
        63,
        236,
        246
      ]
    },
    {
      "name": "usernameAuthorityTransferredEvent",
      "discriminator": [
        169,
        128,
        164,
        236,
        203,
        67,
        147,
        221
      ]
    },
    {
      "name": "usernameCreatedEvent",
      "discriminator": [
        186,
        17,
        123,
        213,
        3,
        164,
        96,
        224
      ]
    },
    {
      "name": "usernameLinkedToMailboxEvent",
      "discriminator": [
        228,
        39,
        100,
        210,
        181,
        131,
        138,
        125
      ]
    },
    {
      "name": "usernameNftMintCreatedEvent",
      "discriminator": [
        57,
        71,
        33,
        4,
        156,
        206,
        5,
        153
      ]
    },
    {
      "name": "usernameRewrappedEvent",
      "discriminator": [
        1,
        248,
        89,
        41,
        168,
        31,
        225,
        86
      ]
    },
    {
      "name": "usernameUnwrappedEvent",
      "discriminator": [
        161,
        205,
        89,
        209,
        242,
        30,
        250,
        58
      ]
    },
    {
      "name": "usernameWrappedEvent",
      "discriminator": [
        200,
        217,
        249,
        41,
        22,
        254,
        111,
        128
      ]
    },
    {
      "name": "wrappedUsernameMailboxChangedEvent",
      "discriminator": [
        0,
        207,
        103,
        166,
        125,
        16,
        13,
        185
      ]
    },
    {
      "name": "wrapperFundsWithdrawnEvent",
      "discriminator": [
        193,
        131,
        79,
        12,
        105,
        71,
        36,
        110
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6001,
      "name": "invalidBody",
      "msg": "The body of your email is too long. The max is 512 chars"
    },
    {
      "code": 6002,
      "name": "invalidSubject",
      "msg": "The subject of your email is too long. The max is 40 chars"
    },
    {
      "code": 6003,
      "name": "invalidSalt",
      "msg": "The salt should be exactly 16 chars"
    },
    {
      "code": 6004,
      "name": "invalidIv",
      "msg": "The IV should be exactly 32 chars"
    },
    {
      "code": 6005,
      "name": "invalidDiffie",
      "msg": "The diffie publickey should be exactly 64 chars"
    },
    {
      "code": 6006,
      "name": "invalidDestination",
      "msg": "From and to address should not be same"
    },
    {
      "code": 6007,
      "name": "invalidSource",
      "msg": "Signer and from address should be same"
    },
    {
      "code": 6008,
      "name": "unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6009,
      "name": "unauthorizedSigner",
      "msg": "Unauthorized signer"
    },
    {
      "code": 6010,
      "name": "invalidLabel",
      "msg": "Invalid label"
    },
    {
      "code": 6011,
      "name": "invalidMailAccount",
      "msg": "Invalid mailaccount"
    },
    {
      "code": 6012,
      "name": "usernameAlreadyExists",
      "msg": "Username already exists"
    },
    {
      "code": 6013,
      "name": "invalidUsername",
      "msg": "Invalid username - must be 3-32 characters, alphanumeric and underscores only"
    },
    {
      "code": 6014,
      "name": "usernameNotFound",
      "msg": "Username not found"
    },
    {
      "code": 6015,
      "name": "usernameAlreadyWrapped",
      "msg": "Username is already wrapped as NFT"
    },
    {
      "code": 6016,
      "name": "usernameNotWrapped",
      "msg": "Username is not wrapped"
    },
    {
      "code": 6017,
      "name": "cannotModifyWrappedUsername",
      "msg": "Cannot modify wrapped username - unwrap first"
    },
    {
      "code": 6018,
      "name": "invalidNewAuthority",
      "msg": "Invalid new authority"
    },
    {
      "code": 6019,
      "name": "invalidMailbox",
      "msg": "Invalid mailbox"
    },
    {
      "code": 6020,
      "name": "wrapperAlreadyExists",
      "msg": "Wrapper already exists for this username"
    },
    {
      "code": 6021,
      "name": "wrapperNotFound",
      "msg": "Wrapper not found"
    },
    {
      "code": 6022,
      "name": "wrapperNotActive",
      "msg": "Wrapper is not active"
    },
    {
      "code": 6023,
      "name": "invalidWrapperState",
      "msg": "Invalid wrapper state"
    },
    {
      "code": 6024,
      "name": "nftMintMismatch",
      "msg": "NFT mint mismatch"
    },
    {
      "code": 6025,
      "name": "invalidNftAmount",
      "msg": "Invalid NFT amount - must be exactly 1"
    },
    {
      "code": 6026,
      "name": "invalidCollectionMint",
      "msg": "Invalid collection mint"
    },
    {
      "code": 6027,
      "name": "collectionNotVerified",
      "msg": "Collection not verified"
    },
    {
      "code": 6028,
      "name": "invalidMetadataAccount",
      "msg": "Invalid metadata account"
    },
    {
      "code": 6029,
      "name": "metadataCreationFailed",
      "msg": "Metadata creation failed"
    },
    {
      "code": 6030,
      "name": "usernameLockedForModifications",
      "msg": "Username is locked for modifications"
    },
    {
      "code": 6031,
      "name": "nftTransferNotAllowed",
      "msg": "NFT transfer not allowed"
    },
    {
      "code": 6032,
      "name": "invalidOriginalAuthority",
      "msg": "Invalid original authority"
    },
    {
      "code": 6033,
      "name": "centralStateNotInitialized",
      "msg": "Central state not initialized"
    },
    {
      "code": 6034,
      "name": "invalidCentralState",
      "msg": "Invalid central state"
    }
  ],
  "types": [
    {
      "name": "mailAccountV2RegisterEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "account",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mailAccountV2UpdateEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "account",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mailLabel",
      "repr": {
        "kind": "rust"
      },
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "outbox"
          },
          {
            "name": "inbox"
          },
          {
            "name": "read"
          },
          {
            "name": "trash"
          },
          {
            "name": "spam"
          }
        ]
      }
    },
    {
      "name": "mailSendEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mailV2ReadEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mailV2SendEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "mailV2UpdateEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "parentId",
            "type": "string"
          },
          {
            "name": "markAsRead",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "subject",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "iv",
            "type": "string"
          },
          {
            "name": "salt",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mailV2UpdateLabelEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "solMail",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "parentId",
            "type": "string"
          },
          {
            "name": "markAsRead",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "subject",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "iv",
            "type": "string"
          },
          {
            "name": "salt",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "solMailAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nostrKey",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "solMailAccountV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "nostrKey",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "solMailV2",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "pubkey"
          },
          {
            "name": "to",
            "type": "pubkey"
          },
          {
            "name": "markAsRead",
            "type": "bool"
          },
          {
            "name": "label",
            "type": {
              "defined": {
                "name": "mailLabel"
              }
            }
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "parentId",
            "type": "string"
          },
          {
            "name": "subject",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "iv",
            "type": "string"
          },
          {
            "name": "salt",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "solmailCentralState",
      "docs": [
        "Central State for managing collection and program authority"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tag",
            "type": "u8"
          },
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "totalWrapped",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "solmailCollectionCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "centralState",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameAccount",
      "docs": [
        "Username Account structure (PDA-based)"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "domainAccount",
            "type": "pubkey"
          },
          {
            "name": "isWrapped",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "usernameAuthorityTransferredEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "oldAuthority",
            "type": "pubkey"
          },
          {
            "name": "newAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "mailbox",
            "type": "pubkey"
          },
          {
            "name": "usernameAccount",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameLinkedToMailboxEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "oldMailbox",
            "type": "pubkey"
          },
          {
            "name": "newMailbox",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameNftMintCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "usernameAccount",
            "type": "pubkey"
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "feePayer",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameRewrappedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameUnwrappedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "redeemer",
            "type": "pubkey"
          },
          {
            "name": "originalAuthority",
            "type": "pubkey"
          },
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameWrappedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          },
          {
            "name": "nftDestination",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "usernameWrapper",
      "docs": [
        "Username Wrapper - PDA that holds username authority during tokenization"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tag",
            "type": {
              "defined": {
                "name": "wrapperTag"
              }
            }
          },
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "usernameAccount",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "originalAuthority",
            "type": "pubkey"
          },
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "u32"
          },
          {
            "name": "mailboxLocked",
            "type": "bool"
          },
          {
            "name": "transferAllowed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "wrappedUsernameMailboxChangedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "username",
            "type": "string"
          },
          {
            "name": "domain",
            "type": "string"
          },
          {
            "name": "nftOwner",
            "type": "pubkey"
          },
          {
            "name": "oldMailbox",
            "type": "pubkey"
          },
          {
            "name": "newMailbox",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "wrapperFundsWithdrawnEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wrapperAccount",
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "splAmount",
            "type": "u64"
          },
          {
            "name": "solAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "wrapperTag",
      "docs": [
        "Wrapper state tags for tracking tokenization status"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "uninitialized"
          },
          {
            "name": "activeWrapper"
          },
          {
            "name": "inactiveWrapper"
          }
        ]
      }
    }
  ]
};
