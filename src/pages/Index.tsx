import { Instagram, Mail } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import blackHoleBg from "@/assets/nasa-black-hole.png";

const Index = () => {
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

      {/* Projects Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center">
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
      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-mono">About Me</h2>
          <p className="text-lg md:text-xl text-white leading-relaxed font-mono">
            Hello, my name is Curren and I like to help people. Ever since I was young, I have had a burning desire to invent. I am from San Francisco, California, and graduated from the University of Utah with a BA in Psychology. I love to travel, meet new people, and watch the bubble float to the top of the honey jar.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen py-20 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white font-mono">Get In Touch</h2>
          
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
      </section>
    </div>
  );
};

export default Index;
