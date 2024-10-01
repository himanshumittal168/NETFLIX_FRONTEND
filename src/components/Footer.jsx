import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black opacity-90 text-gray-400 py-8">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">FAQ</li>
            <li className="mb-2 hover:text-white cursor-pointer">Investor Relations</li>
            <li className="mb-2 hover:text-white cursor-pointer">Privacy</li>
            <li className="mb-2 hover:text-white cursor-pointer">Speed Test</li>
          </ul>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Help Center</li>
            <li className="mb-2 hover:text-white cursor-pointer">Jobs</li>
            <li className="mb-2 hover:text-white cursor-pointer">Cookie Preferences</li>
            <li className="mb-2 hover:text-white cursor-pointer">Legal Notices</li>
          </ul>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Account</li>
            <li className="mb-2 hover:text-white cursor-pointer">Ways to Watch</li>
            <li className="mb-2 hover:text-white cursor-pointer">Corporate Information</li>
            <li className="mb-2 hover:text-white cursor-pointer">Netflix Originals</li>
          </ul>
          <ul>
            <li className="mb-2 hover:text-white cursor-pointer">Media Center</li>
            <li className="mb-2 hover:text-white cursor-pointer">Terms of Use</li>
            <li className="mb-2 hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>
        
        <p className="text-center mt-10 text-sm">&copy; 2024 Netflix, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;