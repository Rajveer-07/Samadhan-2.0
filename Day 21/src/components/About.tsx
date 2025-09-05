import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  // Skills jo maine college mein seekhe hai - frontend, backend, tools
  const skills = {
    frontend: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MongoDB", "Python", "Flask"],
    tools: ["Git", "GitHub", "VS Code", "Figma", "Postman"]
  };

  const experience = [
    {
      title: "Web Development Intern",
      company: "Local Tech Startup",
      period: "Summer 2024",
      description: "Worked on frontend development using React and helped build responsive web applications."
    },
    {
      title: "Freelance Web Developer", 
      company: "Personal Projects",
      period: "2023 - Present",
      description: "Created websites for local businesses and college events using modern web technologies."
    },
    {
      title: "Technical Team Member",
      company: "RGPV Coding Club",
      period: "2023 - Present", 
      description: "Active member organizing coding competitions and workshops for fellow students."
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            2nd Year CSE student passionate about technology and problem-solving
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Story */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Currently pursuing Computer Science Engineering at RGPV University, Bhopal. 
                Started my coding journey in first year and quickly became fascinated with web development 
                and the endless possibilities of creating digital solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Always eager to learn new technologies and work on challenging projects. 
                I believe in writing clean code and creating user-friendly applications that 
                solve real problems. Active in college coding communities and hackathons.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold gradient-text mb-2">8.2</div>
                <div className="text-sm text-muted-foreground">Current CGPA</div>
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Skills & Technologies</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-3 text-primary">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover-lift">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3 text-accent">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-accent text-accent hover-lift">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3 text-muted-foreground">Tools & Others</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} className="hover-lift">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">Experience</h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index} className="card-shadow hover-lift transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
                  </div>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;