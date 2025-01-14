import React from 'react';

interface BankAccount {
    accountNumber: string;
    accountType: string;
    balance: number;
    currency: string;
}

interface BankAccountCardProps {
    account: BankAccount;
}

const BankAccountCard: React.FC<BankAccountCardProps> = ({ account }) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Account: {account.accountNumber}</h5>
                <p className="card-text">
                    <strong>Type: </strong>{account.accountType}
                </p>
                <p className="card-text">
                    <strong>Balance: </strong>{account.balance.toFixed(2)} {account.currency}
                </p>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary">View Details</button>
                    <button className="btn btn-secondary">Transfer</button>
                </div>
            </div>
        </div>
    );
};

export default BankAccountCard;
