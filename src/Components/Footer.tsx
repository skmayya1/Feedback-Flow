import Link from "next/link";
import { FaFacebook ,FaInstagram , FaTwitter , FaLinkedin} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-zinc-800 text-white border-t border-zinc-700 mt-10">
      <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding and Description */}
        <div>
          <Link href="/" className="text-2xl font-bold font-sans">
            Feedback Flow
          </Link>
          <p className="mt-4 text-sm">
            A platform to share your feedback and help businesses improve their services. We value your voice!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 font-light text-sm">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">About Us</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:underline">Categories</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Social Media and Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-500">
                <FaFacebook/>
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-400">
              <FaTwitter/>
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram/>
            </Link>
            <Link href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-blue-700">
              <FaLinkedin/>
            </Link>
          </div>
          <p className="mt-4 text-sm">
            Email: <a href="mailto:support@feedbackflow.com" className="hover:underline">support@feedbackflow.com</a>
          </p>
        </div>
      </div>
      <div className="bg-zinc-900 text-center py-4">
        <p className="text-sm">© 2024 Feedback Flow. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
