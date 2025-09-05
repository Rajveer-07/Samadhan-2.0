import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  // College projects aur personal projects jo maine banaye hai
  const projects = [
    {
      title: "College Event Management System",
      category: "fullstack",
      description: "Complete event management system for RGPV college events with student registration and admin panel.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Student Grade Calculator",
      category: "frontend",
      description: "Interactive CGPA and percentage calculator specifically designed for RGPV grading system.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["React", "JavaScript", "Tailwind CSS", "Local Storage"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Weather App",
      category: "frontend",
      description: "Real-time weather application with city search and 5-day forecast for Bhopal and other cities.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      technologies: ["JavaScript", "Weather API", "CSS3", "HTML5"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Library Management System",
      category: "fullstack",
      description: "Digital library system for college with book issuing, returning and fine calculation features.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      technologies: ["Python", "Flask", "SQLite", "Bootstrap"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Personal Portfolio",
      category: "frontend",
      description: "This very portfolio website built from scratch with modern design and smooth animations.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "College Notice Board API",
      category: "backend",
      description: "REST API for college notice board system with authentication and role-based access control.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "fullstack", label: "Full-Stack" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Featured projects always show first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={filter === category.key ? "default" : "outline"}
              onClick={() => setFilter(category.key)}
              className={filter === category.key 
                ? "bg-primary text-primary-foreground" 
                : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project, index) => (
            <Card key={index} className="group hover-lift transition-all duration-300 overflow-hidden card-shadow">
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                </div>
              )}
              
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  {project.title}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {project.category}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            View More on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;