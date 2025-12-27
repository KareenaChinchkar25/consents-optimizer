import { Shield, Lock, BarChart3, Zap, CheckCircle, ArrowRight, Users, Globe, ShieldCheck, Cpu, Database, FileText, Settings, AlertCircle, TrendingUp, Cloud, Key, Eye, Clock, MessageSquare, Users2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Professional color palette for privacy/security
const COLORS = {
  primary: '#2563EB',      // Trustworthy blue
  secondary: '#0EA5E9',    // Light blue
  accent: '#8B5CF6',       // Purple for highlights
  dark: '#1E293B',         // Dark slate
  light: '#F8FAFC',        // Light slate
  gray: '#64748B',         // Medium gray
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Amber
}

const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
    >
      <div className="inline-flex items-center justify-center p-3 rounded-lg mb-6"
        style={{ backgroundColor: `${COLORS.primary}15` }}
      >
        <Icon className="h-6 w-6" style={{ color: COLORS.primary }} />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

const StatCard = ({ number, label, icon: Icon, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center p-6 bg-white rounded-lg shadow-md"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
        style={{ backgroundColor: `${COLORS.primary}10` }}
      >
        <Icon className="h-6 w-6" style={{ color: COLORS.primary }} />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  )
}

const LandingPage = ({ onEnterDashboard }) => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Automated Consent Management',
      description: 'Streamline consent collection, storage, and management across all platforms with automated workflows.'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics Dashboard',
      description: 'Monitor consent rates, preferences, and compliance status with intuitive visual analytics.'
    },
    {
      icon: Lock,
      title: 'GDPR & CCPA Compliance',
      description: 'Ensure full compliance with global privacy regulations including GDPR, CCPA, LGPD, and more.'
    },
    {
      icon: Cpu,
      title: 'AI-Powered Risk Assessment',
      description: 'Intelligent algorithms identify and alert you to potential privacy risks before they become issues.'
    },
    {
      icon: Users,
      title: 'User Preference Center',
      description: 'Provide users with transparent control over their data preferences and consent settings.'
    },
    {
      icon: Database,
      title: 'Secure Data Repository',
      description: 'Enterprise-grade encrypted storage for all consent records with audit trail capabilities.'
    },
    {
      icon: Cloud,
      title: 'Cloud-Native Architecture',
      description: 'Scalable infrastructure that grows with your business needs and user base.'
    },
    {
      icon: FileText,
      title: 'Automated Documentation',
      description: 'Generate compliance reports and documentation automatically for regulators and auditors.'
    }
  ]

  const stats = [
    { number: '99.9%', label: 'Uptime SLA', icon: Zap },
    { number: '50+', label: 'Regulations Supported', icon: Globe },
    { number: '24/7', label: 'Monitoring', icon: Eye },
    { number: '30min', label: 'Average Setup Time', icon: Clock }
  ]

  const complianceStandards = [
    'GDPR', 'CCPA', 'LGPD', 'PIPL', 'PDPA', 'POPIA', 'APPI'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Consent Manager</h1>
                <p className="text-xs text-gray-500">Privacy Compliance Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={onEnterDashboard}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 rounded-lg font-medium text-white shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: COLORS.primary }}
              >
                <span className="flex items-center">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Enterprise-Grade Privacy Platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Simplify Privacy Compliance
                <span className="block mt-2 text-blue-600">with Intelligent Consent Management</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Manage user consents, ensure regulatory compliance, and build trust with transparent data practices.
                All in one secure platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <motion.button
                  onClick={onEnterDashboard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <span className="flex items-center">
                    Start Free Trial
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </span>
                </motion.button>
                
                <button className="px-8 py-4 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors">
                  Schedule Demo
                </button>
              </div>

              {/* Compliance Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {complianceStandards.map((standard, index) => (
                  <motion.div
                    key={standard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <span className="text-sm font-medium text-gray-700">{standard}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} index={index} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Privacy Management
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage user consent and ensure regulatory compliance
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How Consent Manager Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A simple, three-step process to transform your privacy management
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Integrate & Configure',
                description: 'Add our lightweight SDK to your applications and configure your consent preferences.',
                icon: Settings
              },
              {
                step: '02',
                title: 'Manage & Monitor',
                description: 'Use our dashboard to manage user consents and monitor compliance in real-time.',
                icon: BarChart3
              },
              {
                step: '03',
                title: 'Report & Optimize',
                description: 'Generate compliance reports and optimize your privacy practices with insights.',
                icon: TrendingUp
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold mb-6"
                  style={{ 
                    backgroundColor: `${COLORS.primary}10`,
                    color: COLORS.primary 
                  }}
                >
                  {step.step}
                </div>
                <step.icon className="h-12 w-12 mx-auto mb-6" style={{ color: COLORS.primary }} />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Leading Companies
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Consent Manager transformed how we handle user privacy. Setup was straightforward, and compliance reporting is now automated.",
                author: "Sarah Johnson",
                role: "Chief Privacy Officer",
                company: "FinTech Global"
              },
              {
                quote: "The analytics dashboard provides valuable insights into user consent patterns. It's become an essential tool for our compliance team.",
                author: "Michael Chen",
                role: "Data Protection Lead",
                company: "HealthTech Solutions"
              },
              {
                quote: "Excellent support and robust features. We've reduced our compliance audit time by 70% since implementation.",
                author: "Elena Rodriguez",
                role: "Compliance Director",
                company: "E-commerce Platform"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <MessageSquare className="h-8 w-8 text-blue-500 mb-6" />
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <div className="bg-blue-50 rounded-2xl p-12 border border-blue-100">
                <Shield className="h-16 w-16 mx-auto mb-8" style={{ color: COLORS.primary }} />
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Ready to Simplify Your Privacy Compliance?
                </h2>
                
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                  Join thousands of companies who trust Consent Manager to handle their privacy compliance needs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    onClick={onEnterDashboard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    <span className="flex items-center">
                      Start Free Trial
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </span>
                  </motion.button>
                  
                  <button className="px-8 py-4 rounded-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                    Contact Sales
                  </button>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap justify-center gap-8 text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>14-day free trial</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Enterprise-grade security</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Consent Manager</h2>
                  <p className="text-gray-400 text-sm">Privacy Compliance Platform</p>
                </div>
              </div>
              <p className="text-gray-400">
                Enterprise-grade consent management and privacy compliance solution.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Consent Manager. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">SOC 2 Type II Certified</span>
                <span className="text-gray-400 text-sm">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage