import React from 'react';
import { Link } from 'react-router-dom';  // For routing links

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    {/* Footer Links */}
                    <div className="col-md-6">
                        <div className="footer-links">
                            <Link to="/privacy-policy" className="text-white me-3">
                                Privacy Policy
                            </Link>
                            <Link to="/terms-of-service" className="text-white">
                                Terms of Service
                            </Link>
                        </div>
                    </div>

                    {/* Footer Copy */}
                    <div className="col-md-6 text-md-end">
                        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
