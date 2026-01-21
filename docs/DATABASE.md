# Database Schema Reference

## Tables

### campaigns
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Campaign title |
| description | text | Full description |
| budget | numeric | Total budget in USD |
| status | text | active/paused/completed |
| created_at | timestamptz | Creation timestamp |
| owner_fid | bigint | Farcaster ID of owner |

### participants
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| campaign_id | uuid | Foreign key to campaigns |
| user_fid | bigint | Participant's Farcaster ID |
| joined_at | timestamptz | Join timestamp |
| status | text | pending/approved/rejected |

### submissions
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| participant_id | uuid | FK to participants |
| screenshot_url | text | Uploaded screenshot URL |
| verified | boolean | Verification status |
| submitted_at | timestamptz | Submission timestamp |
