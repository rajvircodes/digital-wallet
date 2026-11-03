CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    reference VARCHAR(50) NOT NULL UNIQUE,

    type VARCHAR(20) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    amount BIGINT NOT NULL,

    source_wallet_id UUID,

    destination_wallet_id UUID,

    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_transaction_type
        CHECK (type IN ('DEPOSIT', 'WITHDRAWAL', 'TRANSFER')),

    CONSTRAINT chk_transaction_status
        CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')),

    CONSTRAINT chk_transaction_amount
        CHECK (amount > 0),

    CONSTRAINT chk_different_wallets
        CHECK (
            source_wallet_id IS NULL
            OR destination_wallet_id IS NULL
            OR source_wallet_id <> destination_wallet_id
        ),

    CONSTRAINT fk_transaction_source_wallet
        FOREIGN KEY (source_wallet_id)
        REFERENCES wallets(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_transaction_destination_wallet
        FOREIGN KEY (destination_wallet_id)
        REFERENCES wallets(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_transaction_wallets
        CHECK (
            (type = 'DEPOSIT'
                AND source_wallet_id IS NULL
                AND destination_wallet_id IS NOT NULL)

            OR

            (type = 'WITHDRAWAL'
                AND source_wallet_id IS NOT NULL
                AND destination_wallet_id IS NULL)

            OR

            (type = 'TRANSFER'
                AND source_wallet_id IS NOT NULL
                AND destination_wallet_id IS NOT NULL)
        )
);