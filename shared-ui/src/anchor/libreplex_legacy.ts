export type LibreplexLegacy = {
  "version": "0.0.0",
  "name": "libreplex_legacy",
  "instructions": [
    {
      "name": "claimExcessRentAsUauth",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "inscribeLegacyMetadataAsUauth",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "legacySigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionV2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionRanksCurrentPage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionRanksNextPage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "validationHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "writeToLegacyInscriptionAsUauth",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionV2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "WriteToInscriptionInput"
          }
        }
      ]
    },
    {
      "name": "resizeLegacyInscriptionAsUauth",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionV2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "ResizeLegacyInscriptionInput"
          }
        }
      ]
    },
    {
      "name": "makeImmutable",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionV2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setValidationHash",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "validationHash",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "inscription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "root",
            "type": "publicKey"
          },
          {
            "name": "mediaType",
            "type": {
              "defined": "MediaType"
            }
          },
          {
            "name": "encodingType",
            "type": {
              "defined": "EncodingType"
            }
          },
          {
            "name": "inscriptionData",
            "type": "publicKey"
          },
          {
            "name": "order",
            "type": "u64"
          },
          {
            "name": "size",
            "type": "u32"
          },
          {
            "name": "validationHash",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "legacyInscription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "inscription",
            "type": "publicKey"
          },
          {
            "name": "legacyType",
            "type": {
              "defined": "LegacyType"
            }
          },
          {
            "name": "authorityType",
            "type": {
              "defined": "AuthorityType"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "WriteToInscriptionInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": "bytes"
          },
          {
            "name": "startPos",
            "type": "u32"
          },
          {
            "name": "mediaType",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "encodingType",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "EncodingType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "Base64"
          }
        ]
      }
    },
    {
      "name": "MediaType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "Audio",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Application",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Image",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Video",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Text",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Custom",
            "fields": [
              {
                "name": "mediaType",
                "type": "string"
              }
            ]
          },
          {
            "name": "Erc721"
          }
        ]
      }
    },
    {
      "name": "AuthorityType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Holder"
          },
          {
            "name": "UpdateAuthority"
          }
        ]
      }
    },
    {
      "name": "ResizeLegacyInscriptionInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "change",
            "type": "i32"
          },
          {
            "name": "expectedStartSize",
            "type": "u32"
          },
          {
            "name": "targetSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "LegacyType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "MetaplexMint"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "BadMint",
      "msg": "Metadata has a bad mint"
    },
    {
      "code": 6001,
      "name": "CannotInscribeFungible",
      "msg": "Cannot inscribe a fungible asset"
    },
    {
      "code": 6002,
      "name": "BadAuthority",
      "msg": "Bad authority"
    },
    {
      "code": 6003,
      "name": "BadAuthorityForHolderInscription",
      "msg": "Bad authority for holder inscription"
    },
    {
      "code": 6004,
      "name": "BadAuthorityForUpdateAuthInscription",
      "msg": "Bad authority for update auth inscription"
    },
    {
      "code": 6005,
      "name": "MultiSigThresholdMustBeOne",
      "msg": "Multi Signature threshold must be one to create / edit inscriptions"
    },
    {
      "code": 6006,
      "name": "NotSquadsMember",
      "msg": "Not squads member"
    },
    {
      "code": 6007,
      "name": "Inscription2KeyMismatch",
      "msg": "Inscription V2 key mismatch"
    }
  ]
};

export const IDL: LibreplexLegacy = {
  "version": "0.0.0",
  "name": "libreplex_legacy",
  "instructions": [
    {
      "name": "claimExcessRentAsUauth",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "inscribeLegacyMetadataAsUauth",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "legacySigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionV2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionRanksCurrentPage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionRanksNextPage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "validationHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "writeToLegacyInscriptionAsUauth",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionV2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "WriteToInscriptionInput"
          }
        }
      ]
    },
    {
      "name": "resizeLegacyInscriptionAsUauth",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionV2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "ResizeLegacyInscriptionInput"
          }
        }
      ]
    },
    {
      "name": "makeImmutable",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionV2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inscriptionSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setValidationHash",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "legacyInscription",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inscriptionsProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "validationHash",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "inscription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "root",
            "type": "publicKey"
          },
          {
            "name": "mediaType",
            "type": {
              "defined": "MediaType"
            }
          },
          {
            "name": "encodingType",
            "type": {
              "defined": "EncodingType"
            }
          },
          {
            "name": "inscriptionData",
            "type": "publicKey"
          },
          {
            "name": "order",
            "type": "u64"
          },
          {
            "name": "size",
            "type": "u32"
          },
          {
            "name": "validationHash",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "legacyInscription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "inscription",
            "type": "publicKey"
          },
          {
            "name": "legacyType",
            "type": {
              "defined": "LegacyType"
            }
          },
          {
            "name": "authorityType",
            "type": {
              "defined": "AuthorityType"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "WriteToInscriptionInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": "bytes"
          },
          {
            "name": "startPos",
            "type": "u32"
          },
          {
            "name": "mediaType",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "encodingType",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "EncodingType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "Base64"
          }
        ]
      }
    },
    {
      "name": "MediaType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "Audio",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Application",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Image",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Video",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Text",
            "fields": [
              {
                "name": "subtype",
                "type": "string"
              }
            ]
          },
          {
            "name": "Custom",
            "fields": [
              {
                "name": "mediaType",
                "type": "string"
              }
            ]
          },
          {
            "name": "Erc721"
          }
        ]
      }
    },
    {
      "name": "AuthorityType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Holder"
          },
          {
            "name": "UpdateAuthority"
          }
        ]
      }
    },
    {
      "name": "ResizeLegacyInscriptionInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "change",
            "type": "i32"
          },
          {
            "name": "expectedStartSize",
            "type": "u32"
          },
          {
            "name": "targetSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "LegacyType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "MetaplexMint"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "BadMint",
      "msg": "Metadata has a bad mint"
    },
    {
      "code": 6001,
      "name": "CannotInscribeFungible",
      "msg": "Cannot inscribe a fungible asset"
    },
    {
      "code": 6002,
      "name": "BadAuthority",
      "msg": "Bad authority"
    },
    {
      "code": 6003,
      "name": "BadAuthorityForHolderInscription",
      "msg": "Bad authority for holder inscription"
    },
    {
      "code": 6004,
      "name": "BadAuthorityForUpdateAuthInscription",
      "msg": "Bad authority for update auth inscription"
    },
    {
      "code": 6005,
      "name": "MultiSigThresholdMustBeOne",
      "msg": "Multi Signature threshold must be one to create / edit inscriptions"
    },
    {
      "code": 6006,
      "name": "NotSquadsMember",
      "msg": "Not squads member"
    },
    {
      "code": 6007,
      "name": "Inscription2KeyMismatch",
      "msg": "Inscription V2 key mismatch"
    }
  ]
};
