# Olympus ShapeShift Nodejs

## Base URI

`https://api.olympuslabs.io/shapeshift`

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
- 1: failure

## APIs

- [get rates](#trade-rates-only)
- [get trade info](#trade-info)

### trade rates only

Method:
```
POST /rates
```

Request data:
```
[
  "eth_mot",
  "eth_knc",
  ...
]
```

Response data:
```
{
  error: ErrorObject,
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
POST /trades
```

Request data:
```
[
  "eth_mot",
  "eth_knc",
  ...
]
```

Response data:
```
{
  error: ErrorObject,
  data: {
    "eth_mot": {
      rate: 1.234,
      limit: 124,
      tradeAddress: 0xabc...xyz,
    },
    "eth_knc": {
      rate: 1.234,
      limit: 124,
      tradeAddress: 0xabc...xyz,
    },
    ...
  }
}
```
