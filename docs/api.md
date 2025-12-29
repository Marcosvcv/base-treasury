# BaseTreasury API Documentation

## Base URL

```
https://api.basetreasury.org
```

## Endpoints

### Health Check

```
GET /health
```

Returns API health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-27T12:00:00.000Z"
}
```

### Get Treasury Overview

```
GET /treasury/:address/overview
```

Get comprehensive overview of a treasury.

**Parameters:**
- `address` (path): Treasury address (0x...)

**Response:**
```json
{
  "address": "0x...",
  "balance": "100.5",
  "balanceWei": "100500000000000000000",
  "monthlyBurn": 10.2,
  "runwayMonths": 9,
  "topCategory": "DEVELOPMENT"
}
```

### Get Spending Breakdown

```
GET /treasury/:address/spending
```

Get spending breakdown by category.

**Parameters:**
- `address` (path): Treasury address

**Response:**
```json
{
  "total": "50.5",
  "byCategory": {
    "GRANT": "20.0",
    "SALARY": "15.0",
    "DEVELOPMENT": "10.0",
    "LIQUIDITY": "5.0",
    "MARKETING": "0.5",
    "INFRASTRUCTURE": "0",
    "OPERATIONS": "0",
    "UNKNOWN": "0"
  },
  "transactions": []
}
```

### Get Runway Analysis

```
GET /treasury/:address/runway
```

Get runway analysis (how long treasury will last).

**Parameters:**
- `address` (path): Treasury address

**Response:**
```json
{
  "address": "0x...",
  "currentBalance": 100.5,
  "monthlyBurn": 10.2,
  "runwayMonths": 9
}
```

### Get Top Recipients

```
GET /treasury/:address/recipients
```

Get top recipients of treasury funds.

**Parameters:**
- `address` (path): Treasury address

**Response:**
```json
{
  "recipients": [
    {
      "address": "0x...",
      "amount": "20.0",
      "count": 5
    }
  ]
}
```

### Get Top Treasuries

```
GET /treasuries/top
```

Get top treasuries by balance.

**Response:**
```json
{
  "treasuries": [
    {
      "address": "0x...",
      "name": "Example DAO",
      "balance": "1000.0",
      "category": "DAO"
    }
  ]
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message"
}
```

**Status Codes:**
- `400`: Bad Request (invalid address, etc.)
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

API rate limits will be implemented in future versions.

## Authentication

Currently, the API is public. Authentication may be added for premium features.

