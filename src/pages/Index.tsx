import { Instagram, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import blackHoleBg from "@/assets/nasa-black-hole.png";

const Index = () => {
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  const [projectsTransform, setProjectsTransform] = useState({ scale: 1, opacity: 1 });
  const [aboutTransform, setAboutTransform] = useState({ scale: 1, opacity: 1 });
  const [contactTransform, setContactTransform] = useState({ scale: 1, opacity: 1 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      const calculateTransform = (element: HTMLElement | null, index: number) => {
        if (!element) return { scale: 1, opacity: 1 };
        
        // Calculate which "section" we're in based on scroll
        const sectionHeight = viewportHeight;
        const sectionScrollStart = index * sectionHeight;
        const sectionScrollEnd = (index + 1) * sectionHeight;
        
        // If we're before this section, it should be zoomed in (coming from future)
        if (scrollY < sectionScrollStart) {
          const progress = (sectionScrollStart - scrollY) / sectionHeight;
          // Starts at scale 4 when far away, approaches 1 as we get closer
          const scale = 1 + (progress * 3);
          const opacity = Math.max(0, 1 - progress);
          return { scale, opacity };
        }
        
        // If we're in this section, scale from 1 to 0 as we scroll through
        if (scrollY >= sectionScrollStart && scrollY < sectionScrollEnd) {
          const progress = (scrollY - sectionScrollStart) / sectionHeight;
          const scale = 1 - progress;
          const opacity = 1 - progress;
          return { scale: Math.max(0, scale), opacity: Math.max(0, opacity) };
        }
        
        // If we've scrolled past, it should be invisible
        return { scale: 0, opacity: 0 };
      };
      
      setProjectsTransform(calculateTransform(projectsRef.current, 0));
      setAboutTransform(calculateTransform(aboutRef.current, 1));
      setContactTransform(calculateTransform(contactRef.current, 2));
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative font-press-start">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: `url(${blackHoleBg})`,
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Spacer to enable scrolling */}
      <div style={{ height: '300vh' }} />

      {/* Projects Section */}
      <section 
        ref={projectsRef}
        className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center fixed inset-0"
        style={{
          transform: `scale(${projectsTransform.scale})`,
          opacity: projectsTransform.opacity,
          pointerEvents: projectsTransform.opacity > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="max-w-2xl mx-auto w-full space-y-8">
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
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center fixed inset-0"
        style={{
          transform: `scale(${aboutTransform.scale})`,
          opacity: aboutTransform.opacity,
          pointerEvents: aboutTransform.opacity > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">About Me</h2>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Hello, my name is Curren and I like to help people. Ever since I was young, I have had a burning desire to invent. I am from San Francisco, California, and graduated from the University of Utah with a BA in Psychology. I love to travel, meet new people, and watch the bubble float to the top of the honey jar.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center fixed inset-0"
        style={{
          transform: `scale(${contactTransform.scale})`,
          opacity: contactTransform.opacity,
          pointerEvents: contactTransform.opacity > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Get In Touch</h2>
          
          <div className="space-y-6 mb-8">
            <a 
              href="mailto:currenclark@gmail.com"
              className="flex items-center justify-center gap-3 text-lg md:text-xl text-white hover:underline transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-6 h-6" />
              <span>currenclark@gmail.com</span>
            </a>
            
            <a 
              href="https://www.instagram.com/currenclark/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-lg md:text-xl text-white hover:underline transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-6 h-6" />
              <span>@currenclark</span>
            </a>
          </div>

          <p className="text-white/70 text-sm md:text-base">
            Contact if you would like me to design an app or website for you.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
