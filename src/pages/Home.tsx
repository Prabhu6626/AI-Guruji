
import { Link } from 'react-router-dom';
import { Brain, Target, FileText, MessageSquare, ArrowRight, Sparkles, CheckCircle, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">AI Guruji</span>
            </Link>
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-40 pb-20 text-center bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Discover Your Perfect
            <span className="gradient-text"> Career Path</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI-powered career guidance that understands you. Take personalized assessments and receive expert recommendations tailored to your unique strengths and interests.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center shadow-lg"
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose AI Guruji?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Everything you need to make an informed career decision</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Brain,
              title: 'AI-Powered Analysis',
              description: 'Advanced algorithms analyze your responses to provide accurate career insights',
              color: 'bg-blue-50',
            },
            {
              icon: Target,
              title: 'Skill Assessment',
              description: 'Comprehensive tests evaluate your strengths, abilities, and interests',
              color: 'bg-green-50',
            },
            {
              icon: FileText,
              title: 'Detailed Reports',
              description: 'Get in-depth analysis of your career compatibility and recommendations',
              color: 'bg-purple-50',
            },
            {
              icon: MessageSquare,
              title: 'Interactive Guidance',
              description: 'Personalized guidance throughout your career exploration journey',
              color: 'bg-yellow-50',
            },
            {
              icon: Sparkles,
              title: 'Career Matching',
              description: 'Discover careers that align perfectly with your profile',
              color: 'bg-pink-50',
            },
            {
              icon: Award,
              title: 'Progress Tracking',
              description: 'Monitor your growth and skill development over time',
              color: 'bg-orange-50',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`${feature.color} p-8 rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200`}
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: '98%', label: 'Accuracy Rate' },
              { number: '10K+', label: 'Active Users' },
              { number: '3', label: 'Complete Assessments' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            Start Your Career Journey Today
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Thousands of students and professionals have discovered their ideal careers with AI Guruji. Join them now.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50"
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
