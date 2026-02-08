import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  Shield,
  Truck,
  Award
} from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Categories", href: "/categories" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Track Order", href: "/track" }
      ]
    },
    {
      title: "My Account",
      links: [
        { name: "Profile", href: "/profile" },
        { name: "Orders", href: "/orders" },
        { name: "Wishlist", href: "/wishlist" },
        { name: "Settings", href: "/settings" },
        { name: "Login", href: "/login" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Blog", href: "/blog" },
        { name: "Privacy Policy", href: "/privacy" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const features = [
    { icon: Truck, text: "Free Delivery" },
    { icon: Shield, text: "Secure Payment" },
    { icon: Award, text: "Quality Guarantee" },
    { icon: Heart, text: "Made with Love" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Village Mart
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted local marketplace for fresh produce, daily essentials, and authentic products. 
              Supporting local communities while bringing you the best quality products.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">support@namkeenmart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-400 text-sm">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest offers, new products, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>© 2024 Village Mart. All rights reserved.</span>
              <a href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}