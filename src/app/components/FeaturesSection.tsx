import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Shield, Sparkles } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Authentic Connections",
      description:
        "Connect with people who share your spiritual journey and values.",
    },
    {
      icon: Users,
      title: "Community Building",
      description:
        "Join groups and events that align with your spiritual practices.",
    },
    {
      icon: Shield,
      title: "Safe Space",
      description:
        "A respectful environment where you can be your authentic self.",
    },
    {
      icon: Sparkles,
      title: "Mindful Matching",
      description:
        "Our algorithm considers spiritual compatibility and shared interests.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-spirituality font-bold text-spiritual-primary mb-6 tracking-wide">
            Discover Circle
          </h2>
          <p className="text-xl text-spiritual-text-muted max-w-3xl mx-auto leading-relaxed">
            We're building more than just a dating app - we're creating a community
            of conscious individuals who value authentic connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-spiritual-accent to-spiritual-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-spirituality font-bold text-spiritual-text-dark mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-spiritual-text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
