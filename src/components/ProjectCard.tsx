interface ProjectCardProps {
  title: string;
  url?: string;
  type: "website" | "app";
  comingSoon?: boolean;
}

const ProjectCard = ({ title, url, type, comingSoon }: ProjectCardProps) => {
  const CardWrapper = url && !comingSoon ? "a" : "div";
  const cardProps = url && !comingSoon ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <CardWrapper {...cardProps} className="block text-center py-3">
      <div className="transition-all duration-300 hover:scale-110">
        <p className="text-2xl md:text-3xl font-bold text-white hover:underline">
          {title}
          {comingSoon && <span className="text-white/60 text-lg ml-2">(Coming Soon)</span>}
        </p>
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;
