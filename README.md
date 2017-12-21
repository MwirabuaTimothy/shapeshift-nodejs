# Olympus ShapeShift Nodejs

## Base URI

`https://api.olympuslabs.io/shapeshift/v1`

## Error

struct
```
{
  errorCode: 0,
  errorMessage: "Error Message in string"
}
```

error code:
- 0: success
- 1001: params invalid
- 2001: api failed
- 3001: order failed
## APIs

- [get rates](#trade-rates-only)
- [get trade info](#trade-info)

### trade rates only

Method:
```
POST /v1/rates
```

Request data:
```
{
    pairs : [
  "eth_mot",
  "eth_knc",
  ...]
}
```

Response data:
```
{
  errorCode: 0,
  data: {
    "eth_mot": {
      rate: 1.234,
    },
    "eth_knc": {
      rate: 1.234,
    },
    ...
  }
}
```

### trade info

Method:
```
GET /v1/trades/[address]/[pair]
```

Request data:
```
[address] the address for resulting coin to be sent to
[pair] is any valid coin pair such as btc_ltc or ltc_btc
```

Response data:
```
{
  errorCode: 0,
  data: {
    pair : "btc_ltc",
    rate : "70.1234",
    limit : "1.2345",
    min : "0.00018916",
    deposit: [Deposit Address (or memo field if input coin is BTS / BITUSD)],
    depositType: [Deposit Type (input coin symbol)],
    withdrawal: [Withdrawal Address], //-- will match address submitted in post
    withdrawalType: [Withdrawal Type (output coin symbol)],
    public: [NXT RS-Address pubkey (if input coin is NXT)],
    xrpDestTag : [xrpDestTag (if input coin is XRP)],
    apiPubKey: [public API attached to this shift, if one was given]},
  }
}
example data: {"withdrawal":"AAAAAAAAAAAAA", "pair":"btc_ltc", returnAddress:"BBBBBBBBBBB"}

```