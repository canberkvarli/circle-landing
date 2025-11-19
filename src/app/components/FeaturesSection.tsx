import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Shield, BookHeart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Authentic Connections",
      description:
        "Connect with people who share your journey and values.",
    },
    {
      icon: Users,
      title: "Community Building",
      description:
        "Join groups and events that align with your practices and interests.",
    },
    {
      icon: Shield,
      title: "Safe Space",
      description:
        "A respectful environment where you can be your authentic self.",
    },
    {
      icon: BookHeart,
      title: "Mindful Matching",
      description:
        "Our algorithm considers compatibility and shared interests.",
    },
  ];

  return (
    <section id="features" className="py-32 bg-white dark:bg-spiritual-dark-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-spirituality font-bold text-spiritual-primary mb-8 tracking-wide dark:text-white">
            Discover fullcircle
          </h2>
          <p className="text-2xl text-spiritual-text-muted max-w-3xl mx-auto leading-relaxed dark:text-spiritual-dark-text-muted">
            fullcircle is building more than just a dating app • it&apos;s creating a community
            of mindful individuals who value authentic connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
              <div className="w-24 h-24 bg-gradient-to-br from-spiritual-accent to-spiritual-primary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-spirituality font-bold text-spiritual-text-dark mb-5 tracking-wide dark:text-spiritual-dark-text-dark">
                {feature.title}
              </h3>
              <p className="text-lg text-spiritual-text-muted leading-relaxed dark:text-spiritual-dark-text-muted">
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
