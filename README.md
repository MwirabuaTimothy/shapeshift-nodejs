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

### get trade rates

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
  error: [ErrorObject](#Error),
  data: {
    "eth_mot": {
      rate: 1.234,
      tradeAddress: 0xabc...xyz,
    },
    "eth_knc": {
      rate: 1.234,
      tradeAddress: 0xabc...xyz,
    },
    ...
  }
}
```


### execute trade
