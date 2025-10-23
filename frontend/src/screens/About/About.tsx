import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Award, 
  Users, 
  Truck, 
  Shield, 
  Clock,
  Star,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every namkeen is prepared with traditional recipes passed down through generations, ensuring authentic taste and quality."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest ingredients and maintain strict quality standards to deliver the best products to our customers."
    },
    {
      icon: Users,
      title: "Family Tradition",
      description: "Our recipes have been perfected over decades, bringing you the authentic taste of traditional Indian namkeens."
    },
    {
      icon: Shield,
      title: "Trusted Brand",
      description: "With thousands of satisfied customers, we've built a reputation for reliability and excellence in the namkeen industry."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Passionate about preserving traditional Indian recipes and bringing authentic flavors to modern consumers."
    },
    {
      name: "Priya Sharma",
      role: "Head Chef",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Master chef with 20+ years of experience in traditional Indian cooking and namkeen preparation."
    },
    {
      name: "Amit Patel",
      role: "Quality Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Ensures every product meets our high standards of quality and freshness before reaching customers."
    },
    {
      name: "Sneha Gupta",
      role: "Customer Relations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Dedicated to providing exceptional customer service and building lasting relationships with our clients."
    }
  ];

  const milestones = [
    {
      year: "1995",
      title: "Founded",
      description: "Started as a small family business in Mumbai, specializing in traditional namkeens."
    },
    {
      year: "2005",
      title: "Expansion",
      description: "Expanded operations to serve customers across Maharashtra with fresh daily deliveries."
    },
    {
      year: "2015",
      title: "Digital Launch",
      description: "Launched our online platform to reach customers nationwide with authentic Indian namkeens."
    },
    {
      year: "2020",
      title: "Premium Collection",
      description: "Introduced premium namkeen collection with organic and healthy options."
    },
    {
      year: "2024",
      title: "Innovation",
      description: "Launched NamkeenMart with modern e-commerce platform and nationwide delivery."
    }
  ];

  const stats = [
    { number: "25+", label: "Years of Experience" },
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Product Varieties" },
    { number: "100+", label: "Cities Served" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient">NamkeenMart</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Bringing authentic Indian namkeens and sweets to your doorstep with love, 
              tradition, and uncompromising quality since 1995.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Our Story
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Meet Our Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                NamkeenMart began as a small family business in the bustling streets of Mumbai in 1995. 
                What started as a passion for preserving traditional Indian recipes has grown into 
                a trusted brand serving thousands of customers across India.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our founder, Rajesh Kumar, inherited the art of making perfect namkeens from his 
                grandmother. With her secret recipes and his modern approach to business, we've 
                created a perfect blend of tradition and innovation.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to honor our roots while embracing technology to bring authentic 
                Indian flavors to your doorstep, no matter where you are in the country.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=400&fit=crop"
                alt="Traditional namkeen making"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at NamkeenMart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <value.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind NamkeenMart's success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      {socialLinks.map((social, i) => (
                        <button
                          key={i}
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <social.icon className="w-5 h-5 text-white" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in our growth and development
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
                    <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out to us for any questions, feedback, or just to say hello!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-center">
                  123 Namkeen Street<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p>+91 98765 43210</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p>info@namkeenmart.com</p>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
