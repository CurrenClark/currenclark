import { useEffect, useState } from "react";
import { Instagram, Mail } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import blackHoleBg from "@/assets/nasa-black-hole.png";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showFloatAnimation, setShowFloatAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Trigger float animation when user scrolls past hero
      if (currentScrollY > 300 && !showFloatAnimation) {
        setShowFloatAnimation(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showFloatAnimation]);

  // Calculate opacity for "Curren" text
  const titleOpacity = Math.max(0, 1 - scrollY / 400);
  const titleTransform = `translateY(${scrollY * 0.5}px)`;

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: `url(${blackHoleBg})`,
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div
          className={`text-center ${showFloatAnimation ? 'float-up' : ''}`}
          style={{
            opacity: showFloatAnimation ? 0 : titleOpacity,
            transform: showFloatAnimation ? 'translateY(-200vh) scale(0.5)' : titleTransform,
            transition: showFloatAnimation ? 'all 2s ease-out' : 'none'
          }}
        >
          <h1 className="text-3d-bubble">CURREN</h1>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Thrift Space"
              url="https://thrift-space.com"
              type="website"
            />
            <ProjectCard 
              title="Ballot Hunter"
              url="https://ballot-hunter.com"
              type="website"
            />
            <ProjectCard 
              title="Peer Pressure"
              type="app"
              comingSoon
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-transparent backdrop-blur-sm border-2 border-white p-8 md:p-12 rounded-lg shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">About Me</h2>
            <p className="text-lg md:text-xl text-white leading-relaxed font-mono">
              Hello, my name is Curren and I like to help people. Ever since I was young, I have had a burning desire to invent. I am from San Francisco, California, and graduated from the University of Utah with a BA in Psychology. I love to travel, meet new people, and watch the bubble float to the top of the honey jar.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-[50vh] py-20 px-4 md:px-8 flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-transparent backdrop-blur-sm border-2 border-white p-8 md:p-12 rounded-lg shadow-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Get In Touch</h2>
            
            <div className="space-y-6 mb-8">
              <a 
                href="mailto:currenclark@gmail.com"
                className="flex items-center justify-center gap-3 text-lg md:text-xl text-white hover:underline transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-6 h-6" />
                <span className="font-mono">currenclark@gmail.com</span>
              </a>
              
              <a 
                href="https://www.instagram.com/currenclark/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-lg md:text-xl text-white hover:underline transition-all duration-300 hover:scale-105"
              >
                <Instagram className="w-6 h-6" />
                <span className="font-mono">@currenclark</span>
              </a>
            </div>

            <p className="text-white/70 font-mono text-sm md:text-base">
              Contact if you would like me to design an app or website for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
