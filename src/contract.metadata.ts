// @NOTE: this is generated metadata from https://github.com/bsn-si/ocex-smartcontract build
export default {
  source: {
    hash: "0x3d4fc083046b369217ac15235faf2099e9bbb73782f7ec8cf9bd0dc2636f0040",
    language: "ink! 3.0.1",
    compiler: "rustc 1.62.0-nightly",
  },
  contract: {
    name: "ocex",
    version: "0.1.0",
    authors: ["[Anton Shramko] <[antonshramko@yandex.ru]>"],
  },
  V3: {
    spec: {
      constructors: [
        {
          args: [
            {
              label: "owner",
              type: {
                displayName: ["ink_env", "AccountId"],
                type: 1,
              },
            },
          ],
          docs: ["You can set a contract owner while deploying the contract"],
          label: "new",
          payable: false,
          selector: "0x9bae9d5e",
        },
        {
          args: [],
          docs: ["Owner is the contract publisher by default"],
          label: "default",
          payable: false,
          selector: "0xed4b9d1b",
        },
      ],
      docs: [],
      events: [],
      messages: [
        {
          args: [
            {
              label: "coupon",
              type: {
                displayName: ["CouponId"],
                type: 1,
              },
            },
            {
              label: "amount",
              type: {
                displayName: ["Balance"],
                type: 4,
              },
            },
          ],
          docs: [
            " Set new `coupon` with declared amount.",
            " - Coupon is accepted only if the contract has enough balance.",
            " - Only the `owner` can set a new `coupon`.",
            " Returns: if added - return `amount`, otherwise return none",
          ],
          label: "add_coupon",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["Result"],
            type: 8,
          },
          selector: "0x897f3338",
        },
        {
          args: [
            {
              label: "coupons",
              type: {
                displayName: ["OptCoupons"],
                type: 10,
              },
            },
            {
              label: "amount",
              type: {
                displayName: ["Balance"],
                type: 4,
              },
            },
          ],
          docs: [
            " Set array `max 5 items` of `coupon` with declared per key.",
            " - Accept only if the contract has enough balance.",
            " - Only the `owner` can set a new `coupon`.",
            " Returns: returns struct with accepted (added & active) and declined coupons (if balance is not enough)",
          ],
          label: "add_coupons",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["Result"],
            type: 12,
          },
          selector: "0x4116073e",
        },
        {
          args: [
            {
              label: "transfer_to",
              type: {
                displayName: ["ReceiverAddress"],
                type: 1,
              },
            },
            {
              label: "coupon",
              type: {
                displayName: ["CouponId"],
                type: 1,
              },
            },
            {
              label: "sign",
              type: {
                displayName: [],
                type: 14,
              },
            },
          ],
          docs: [
            " Activate `coupon` with transfer of appropriate liquidity to a receiver's address.",
            " Verified by `sr25519` `signature` with `receiver address`",
            " with `contract id` context",
            "",
            " Returns: boolean success if all valid",
          ],
          label: "activate_coupon",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["Result"],
            type: 15,
          },
          selector: "0x39a0ffa2",
        },
        {
          args: [],
          docs: [
            " Method for transferring spare balance (not reserved for coupons)",
            " to owner's wallet. (for example, if you've transferred more funds",
            " to the smart-contract that was necessary)",
          ],
          label: "payback_not_reserved_funds",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["Result"],
            type: 15,
          },
          selector: "0x84025697",
        },
        {
          args: [
            {
              label: "coupons",
              type: {
                displayName: ["OptCoupons"],
                type: 10,
              },
            },
          ],
          docs: [
            " Method for disabling and burning registered (but not redeemed) coupons.",
            " The contract unlocks reserved funds. Burned coupons can't be reactivated later.",
          ],
          label: "burn_coupons",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["Result"],
            type: 12,
          },
          selector: "0x4be9a0e5",
        },
        {
          args: [
            {
              label: "coupon",
              type: {
                displayName: ["CouponId"],
                type: 1,
              },
            },
          ],
          docs: [" Verification that the coupon is registered and it's value"],
          label: "check_coupon",
          mutates: false,
          payable: false,
          returnType: {
            displayName: [],
            type: 16,
          },
          selector: "0x8f5ba85f",
        },
        {
          args: [],
          docs: [
            " Get info on spare funds of the contract (not reserved for coupons)",
            " available for withdrawal",
            " Allow request only from the contract owner, otherwise return zero",
          ],
          label: "available_balance",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["Balance"],
            type: 4,
          },
          selector: "0x9ae76f03",
        },
      ],
    },
    storage: {
      struct: {
        fields: [
          {
            layout: {
              cell: {
                key: "0x0000000000000000000000000000000000000000000000000000000000000000",
                ty: 0,
              },
            },
            name: "coupons",
          },
          {
            layout: {
              cell: {
                key: "0x0100000000000000000000000000000000000000000000000000000000000000",
                ty: 6,
              },
            },
            name: "burned",
          },
          {
            layout: {
              cell: {
                key: "0x0200000000000000000000000000000000000000000000000000000000000000",
                ty: 1,
              },
            },
            name: "owner",
          },
          {
            layout: {
              cell: {
                key: "0x0300000000000000000000000000000000000000000000000000000000000000",
                ty: 4,
              },
            },
            name: "reserved",
          },
        ],
      },
    },
    types: [
      {
        id: 0,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: "offset_key",
                  type: 5,
                  typeName: "Key",
                },
              ],
            },
          },
          params: [
            {
              name: "K",
              type: 1,
            },
            {
              name: "V",
              type: 4,
            },
          ],
          path: ["ink_storage", "lazy", "mapping", "Mapping"],
        },
      },
      {
        id: 1,
        type: {
          def: {
            composite: {
              fields: [
                {
                  type: 2,
                  typeName: "[u8; 32]",
                },
              ],
            },
          },
          path: ["ink_env", "types", "AccountId"],
        },
      },
      {
        id: 2,
        type: {
          def: {
            array: {
              len: 32,
              type: 3,
            },
          },
        },
      },
      {
        id: 3,
        type: {
          def: {
            primitive: "u8",
          },
        },
      },
      {
        id: 4,
        type: {
          def: {
            primitive: "u128",
          },
        },
      },
      {
        id: 5,
        type: {
          def: {
            composite: {
              fields: [
                {
                  type: 2,
                  typeName: "[u8; 32]",
                },
              ],
            },
          },
          path: ["ink_primitives", "Key"],
        },
      },
      {
        id: 6,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: "offset_key",
                  type: 5,
                  typeName: "Key",
                },
              ],
            },
          },
          params: [
            {
              name: "K",
              type: 1,
            },
            {
              name: "V",
              type: 7,
            },
          ],
          path: ["ink_storage", "lazy", "mapping", "Mapping"],
        },
      },
      {
        id: 7,
        type: {
          def: {
            primitive: "bool",
          },
        },
      },
      {
        id: 8,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 4,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 9,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 4,
            },
            {
              name: "E",
              type: 9,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 9,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: "AccessOwner",
                },
                {
                  index: 1,
                  name: "ContractBalanceNotEnough",
                },
                {
                  index: 2,
                  name: "InvalidParseCoupon",
                },
                {
                  index: 3,
                  name: "InvalidParseCouponSignature",
                },
                {
                  index: 4,
                  name: "VerifySignatureFailed",
                },
                {
                  index: 5,
                  name: "CouponAlreadyExists",
                },
                {
                  index: 6,
                  name: "CouponAlreadyBurned",
                },
                {
                  index: 7,
                  name: "CouponNotFound",
                },
                {
                  index: 8,
                  name: "TransferFailed",
                },
              ],
            },
          },
          path: ["ocex", "ocex", "Error"],
        },
      },
      {
        id: 10,
        type: {
          def: {
            array: {
              len: 5,
              type: 11,
            },
          },
        },
      },
      {
        id: 11,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: "None",
                },
                {
                  fields: [
                    {
                      type: 1,
                    },
                  ],
                  index: 1,
                  name: "Some",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 1,
            },
          ],
          path: ["Option"],
        },
      },
      {
        id: 12,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 13,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 9,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 13,
            },
            {
              name: "E",
              type: 9,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 13,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: "accepted",
                  type: 10,
                  typeName: "OptCoupons",
                },
                {
                  name: "declined",
                  type: 10,
                  typeName: "OptCoupons",
                },
              ],
            },
          },
          path: ["ocex", "ocex", "CouponsResult"],
        },
      },
      {
        id: 14,
        type: {
          def: {
            array: {
              len: 64,
              type: 3,
            },
          },
        },
      },
      {
        id: 15,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 7,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 9,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 7,
            },
            {
              name: "E",
              type: 9,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 16,
        type: {
          def: {
            tuple: [7, 4],
          },
        },
      },
    ],
  },
}
