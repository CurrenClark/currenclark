import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <CardWrapper {...cardProps} className="block">
      <Card className="h-full bg-transparent backdrop-blur-sm border-2 border-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
            {url && !comingSoon && <ExternalLink className="w-5 h-5 text-white flex-shrink-0" />}
          </div>
          <CardDescription className="text-white/70 font-mono">
            {type === "website" ? "Website" : "Mobile App"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {comingSoon ? (
            <p className="text-white font-bold text-lg">Coming Soon</p>
          ) : (
            <p className="text-white/80 font-mono text-sm break-all">{url}</p>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

export default ProjectCard;
