import { Instagram, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import blackHoleBg from "@/assets/nasa-black-hole.png";
const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectsTransform, setProjectsTransform] = useState({
    scale: 1,
    opacity: 1
  });
  const [aboutTransform, setAboutTransform] = useState({
    scale: 1,
    opacity: 1
  });
  const [contactTransform, setContactTransform] = useState({
    scale: 1,
    opacity: 1
  });
  useEffect(() => {
    let scrollProgress = 0.4; // Start with first section visible
    const totalSections = 3;
    const scrollSensitivity = 0.8;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * scrollSensitivity;
      scrollProgress += delta * 0.0015;
      scrollProgress = Math.max(0, Math.min(totalSections - 0.001, scrollProgress));
      updateTransforms();
    };
    const updateTransforms = () => {
      const calculateTransform = (sectionIndex: number) => {
        const sectionProgress = scrollProgress - sectionIndex;

        // Before this section (waiting to enter)
        if (sectionProgress < 0) {
          return {
            scale: 5,
            opacity: 0
          };
        }

        // Entering phase (0 to 0.3): zoom in from massive to normal
        if (sectionProgress < 0.3) {
          const progress = sectionProgress / 0.3;
          const scale = 5 - progress * 4;
          const opacity = progress;
          return {
            scale,
            opacity
          };
        }

        // Display phase (0.3 to 0.5): stay visible briefly
        if (sectionProgress < 0.5) {
          return {
            scale: 1,
            opacity: 1
          };
        }

        // Exit phase (0.5 to 1.0): zoom out to point
        if (sectionProgress < 1.0) {
          const progress = (sectionProgress - 0.5) / 0.5;
          const scale = 1 - progress * 0.99;
          const opacity = 1 - progress;
          return {
            scale,
            opacity
          };
        }

        // After this section
        return {
          scale: 0.01,
          opacity: 0
        };
      };
      setProjectsTransform(calculateTransform(0));
      setAboutTransform(calculateTransform(1));
      setContactTransform(calculateTransform(2));
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, {
        passive: false
      });
    }
    updateTransforms();
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  return <div ref={containerRef} className="relative font-press-start h-screen w-screen overflow-hidden">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10" style={{
      backgroundImage: `url(${blackHoleBg})`,
      backgroundAttachment: 'fixed'
    }} />

      {/* Projects Section */}
      <section className="h-screen py-20 px-4 md:px-8 flex items-center justify-center fixed inset-0" style={{
      transform: `scale(${projectsTransform.scale})`,
      opacity: projectsTransform.opacity,
      pointerEvents: projectsTransform.opacity > 0.5 ? 'auto' : 'none',
      transformOrigin: 'center center'
    }}>
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <ProjectCard title="Thrift Space" url="https://thrift-space.com" type="website" />
          <ProjectCard title="Ballot Hunter" url="https://ballot-hunter.com" type="website" />
          <ProjectCard title="Peer Pressure" type="app" comingSoon />
        </div>
      </section>

      {/* About Section */}
      <section className="h-screen py-20 px-4 md:px-8 flex items-center justify-center fixed inset-0" style={{
      transform: `scale(${aboutTransform.scale})`,
      opacity: aboutTransform.opacity,
      pointerEvents: aboutTransform.opacity > 0.5 ? 'auto' : 'none',
      transformOrigin: 'center center'
    }}>
        <div className="max-w-4xl mx-auto text-center">
          
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Hello, my name is Curren and I like to help people. Ever since I was young, I have had a burning desire to invent. I am from San Francisco, California, and graduated from the University of Utah with a BA in Psychology. I love to travel, meet new people, and watch the bubble float to the top of the honey jar.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="h-screen py-20 px-4 md:px-8 flex items-center justify-center fixed inset-0" style={{
      transform: `scale(${contactTransform.scale})`,
      opacity: contactTransform.opacity,
      pointerEvents: contactTransform.opacity > 0.5 ? 'auto' : 'none',
      transformOrigin: 'center center'
    }}>
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Get In Touch</h2>
          
          <div className="space-y-6 mb-8">
            <a href="mailto:currenclark@gmail.com" className="flex items-center justify-center gap-3 text-lg md:text-xl text-white hover:underline transition-all duration-300 hover:scale-105">
              <Mail className="w-6 h-6" />
              <span>currenclark@gmail.com</span>
            </a>
            
            <a href="https://www.instagram.com/currenclark/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-lg md:text-xl text-white hover:underline transition-all duration-300 hover:scale-105">
              <Instagram className="w-6 h-6" />
              <span>@currenclark</span>
            </a>
          </div>

          
        </div>
      </section>
    </div>;
};
export default Index;