# Proof of Day - API Documentation

This document provides comprehensive documentation for the Proof of Day API endpoints.

## Base URL

- **Production**: `https://proof-of-day.vercel.app/api`
- **Preview**: `https://proof-of-day-preview.vercel.app/api`

## Authentication

All authenticated endpoints require a valid Farcaster signature or session token.

### Headers

```
Authorization: Bearer <token>
Content-Type: application/json
```

## Endpoints

### Check-In

#### POST `/checkin`

Perform a daily check-in for the authenticated user.

**Request Body:**
```json
{
  "fid": 12345,
  "signature": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "checkInId": "uuid",
    "streak": 7,
    "reward": "1000000000000000000",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

**Errors:**
- `400` - Invalid request body
- `401` - Unauthorized
- `409` - Already checked in today

---

### User Stats

#### GET `/user/:fid/stats`

Retrieve statistics for a specific user.

**Parameters:**
- `fid` (path) - User's Farcaster ID

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCheckIns": 150,
    "currentStreak": 7,
    "longestStreak": 30,
    "totalRewards": "50000000000000000000",
    "tier": "gold",
    "reputationScore": 850
  }
}
```

---

### Campaigns

#### GET `/campaigns`

List all active campaigns.

**Query Parameters:**
- `status` (optional) - Filter by status (active, completed, pending)
- `type` (optional) - Filter by campaign type
- `limit` (optional) - Number of results (default: 20, max: 100)
- `offset` (optional) - Pagination offset

**Response:**
```json
{
  "success": true,
  "data": {
    "campaigns": [...],
    "total": 50,
    "hasMore": true
  }
}
```

#### POST `/campaigns`

Create a new campaign (requires authentication).

**Request Body:**
```json
{
  "name": "Campaign Name",
  "description": "Description",
  "type": "follow",
  "budget": "1000000000000000000",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "targetAudience": {
    "minFollowers": 100,
    "verifiedOnly": false
  }
}
```

---

### Leaderboard

#### GET `/leaderboard`

Get the global leaderboard.

**Query Parameters:**
- `period` (optional) - Time period (daily, weekly, monthly, allTime)
- `limit` (optional) - Number of results (default: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "rank": 1,
        "fid": 12345,
        "username": "user",
        "score": 5000,
        "streak": 30
      }
    ],
    "userRank": 42
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Missing or invalid authentication |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `VALIDATION_ERROR` | Invalid request data |
| `RATE_LIMITED` | Too many requests |
| `INTERNAL_ERROR` | Server error |

---

## Rate Limiting

- **Anonymous**: 60 requests/minute
- **Authenticated**: 300 requests/minute
- **Premium**: 1000 requests/minute

Rate limit headers are included in all responses:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

---

## Webhooks

Configure webhooks to receive real-time updates.

### Events

- `checkin.completed` - User completed a check-in
- `campaign.joined` - User joined a campaign
- `reward.claimed` - User claimed rewards

### Payload

```json
{
  "event": "checkin.completed",
  "timestamp": "2024-01-01T12:00:00Z",
  "data": {...}
}
```
