import React from 'react';

interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatarUrl: string;
}

interface CustomerCardProps {
    customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="row no-gutters">
                {/* Avatar Section */}
                <div className="col-md-4">
                    <img
                        src={customer.avatarUrl}
                        alt={customer.name}
                        className="card-img"
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                </div>

                {/* Customer Info Section */}
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{customer.name}</h5>
                        <p className="card-text">
                            <strong>Email: </strong>{customer.email}
                        </p>
                        <p className="card-text">
                            <strong>Phone: </strong>{customer.phone}
                        </p>
                        <p className="card-text">
                            <strong>Address: </strong>{customer.address}
                        </p>
                        <button className="btn btn-primary">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerCard;
