import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Clock, 
  DollarSign,
  Briefcase,
  GraduationCap,
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Career: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹6-10 LPA",
      description: "We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences for our Village Mart platform.",
      requirements: [
        "Proficiency in React, TypeScript, and modern JavaScript",
        "Experience with CSS frameworks like Tailwind CSS",
        "Knowledge of responsive design principles",
        "Experience with version control (Git)",
        "Strong problem-solving skills"
      ],
      responsibilities: [
        "Develop and maintain user-facing features",
        "Collaborate with design and backend teams",
        "Optimize applications for maximum speed and scalability",
        "Write clean, maintainable code",
        "Participate in code reviews"
      ]
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Delhi, NCR",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹8-12 LPA",
      description: "Join our backend team to build robust APIs and services that power our Village Mart ecosystem.",
      requirements: [
        "Strong experience with Node.js and Express.js",
        "Database design and optimization (MongoDB, PostgreSQL)",
        "RESTful API development",
        "Experience with cloud platforms (AWS, Azure)",
        "Knowledge of microservices architecture"
      ],
      responsibilities: [
        "Design and develop scalable backend services",
        "Implement secure authentication and authorization",
        "Optimize database queries and performance",
        "Integrate with third-party services",
        "Ensure code quality and testing"
      ]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experience: "2-3 years",
      salary: "₹5-8 LPA",
      description: "Create beautiful and intuitive user experiences that make shopping at Village Mart a delight.",
      requirements: [
        "Proficiency in Figma, Adobe Creative Suite",
        "Strong understanding of user-centered design",
        "Experience with mobile and web design",
        "Knowledge of design systems",
        "Portfolio demonstrating design skills"
      ],
      responsibilities: [
        "Design user interfaces and experiences",
        "Create wireframes, prototypes, and mockups",
        "Collaborate with product and development teams",
        "Conduct user research and testing",
        "Maintain design consistency across platforms"
      ]
    },
    {
      id: 4,
      title: "Marketing Manager",
      location: "Pune, Maharashtra",
      type: "Full-time",
      experience: "4-6 years",
      salary: "₹7-10 LPA",
      description: "Lead our marketing efforts to grow Village Mart's presence and reach more customers.",
      requirements: [
        "Experience in digital marketing and SEO",
        "Social media marketing expertise",
        "Content creation and management",
        "Analytics and performance tracking",
        "Strong communication skills"
      ],
      responsibilities: [
        "Develop and execute marketing strategies",
        "Manage social media presence",
        "Create engaging content and campaigns",
        "Analyze marketing performance metrics",
        "Coordinate with external agencies"
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and your family"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Access to courses, conferences, and skill development programs"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work-life balance with flexible working hours"
    },
    {
      icon: Users,
      title: "Team Environment",
      description: "Collaborative and supportive team culture"
    }
  ];

  const companyValues = [
    "Innovation and creativity in everything we do",
    "Customer-first approach in all decisions",
    "Transparency and open communication",
    "Continuous learning and growth",
    "Community impact and social responsibility"
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
              Join Our <span className="text-gradient">Village Mart</span> Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Be part of a mission to connect local communities with fresh, quality products. 
              Help us build the future of local commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Open Positions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Learn About Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join Village Mart?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Be part of a growing company that's making a real difference in local communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
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
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore exciting career opportunities with Village Mart
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.experience}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                      <p className="text-gray-600">{job.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-4 p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <ArrowRight className={`w-5 h-5 transition-transform ${selectedJob === job.id ? 'rotate-90' : ''}`} />
                    </motion.button>
                  </div>
                </div>

                {selectedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 p-6 bg-gray-50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Apply Now
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Save Job
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-lg text-gray-600 mb-8">
                At Village Mart, we believe in creating a workplace where everyone can thrive. 
                Our values guide everything we do, from how we treat our customers to how we support our team.
              </p>
              <ul className="space-y-4">
                {companyValues.map((value, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820089-4e9c790f5044?w=600&h=400&fit=crop"
                alt="Team working together"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm">Team Members</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl mb-8 opacity-90">
              Don't see a position that matches your skills? We're always looking for talented individuals 
              to join our growing team. Send us your resume!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Send Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Contact HR
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Career;
