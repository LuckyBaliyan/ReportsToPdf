import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, children }) => (
    <Link 
        to={to} 
        className="text-sm text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out px-3"
    >
        {children}
    </Link>
);

const Footer = () => {
    

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    <div className="flex items-center">
                        <p className="text-sm text-gray-500">
                            &copy; 2025 Clinix Reports. All rights reserved.
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <FooterLink to="/">Privacy Policy</FooterLink>
                        <FooterLink to="/">Terms of Service</FooterLink>
                        <FooterLink to="/">Contact</FooterLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
