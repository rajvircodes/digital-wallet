# Digital Wallet - Database Design

## 1. Core Entities

- Users
- Wallets
- Transactions
- Ledger Accounts
- Ledger Entries

## 2. Relationships

- One User has One Wallet.
- One Wallet has One Ledger Account.
- One Transaction has Many Ledger Entries.
- One Ledger Account has Many Ledger Entries.

## 3. Financial Rules

- Store monetary values as BIGINT in minor currency units.
- Never allow negative wallet balances.
- Every posted transaction must have balanced debit and credit entries.
- Financial records must be immutable after posting.
- Money transfers must execute atomically.
- Every wallet belongs to exactly one user.

## 4. Technology

- PostgreSQL
- Node.js
- Express.js
- TypeScript
- node-postgres (pg)

## 5. Database Principles

- Use UUID primary keys.
- Use foreign key constraints.
- Use unique constraints where appropriate.
- Use database transactions for financial operations.
- Maintain an auditable financial ledger.
