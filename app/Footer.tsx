const Footer = () => {
  return (
    <footer className="border-t border-purple-800 text-gray-300 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6 w-full">
        {/* Left side content */}
        <div className="w-full sm:w-1/2">
          <h3 className="text-xl font-semibold text-purple-400 mb-2">Mental Health Companion</h3>
          <p className="text-sm max-w-md">
            Your safe space to reflect, connect, and grow emotionally. We're here to support your mental well-being.
          </p>
        </div>

        {/* Right side content */}
        <div className="w-full sm:w-1/2 text-sm sm:text-right space-y-1">
          <p className="hover:text-white transition">Email: support@mentalhealthcompanion.com</p>
          <p className="hover:text-white transition">Phone: +91 12345 67890</p>
          <p className="hover:text-white transition">© 2025 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
