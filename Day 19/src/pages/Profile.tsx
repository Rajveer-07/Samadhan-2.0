import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";
import { Calendar, MapPin, Link as LinkIcon } from "lucide-react";

// Complete profile page - full profile with posts and info
const Profile = () => {
  // User ke posts - normally backend se aayenge
  const userPosts = [
    {
      author: "John Doe",
      username: "johndoe",
      time: "1h",
      content: "Just finished a great coding session! Working on a new React project. TypeScript makes everything so much better. 💻✨",
      likes: 15,
      comments: 3
    },
    {
      author: "John Doe", 
      username: "johndoe",
      time: "1d",
      content: "Coffee and code - perfect combination for a productive day. कोई और भी coding enthusiast है यहां? Let's connect! ☕",
      likes: 28,
      comments: 7
    },
    {
      author: "John Doe",
      username: "johndoe", 
      time: "3d",
      content: "Sharing some thoughts on clean code practices. Simple hai - if your code tells a story, you're doing it right! 📚",
      likes: 42,
      comments: 12
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <Card className="shadow-card border-border mb-6">
        <CardContent className="p-6">
          {/* Cover photo area */}
          <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg mb-4"></div>
          
          {/* Profile info section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-8">
            <Avatar className="w-24 h-24 border-4 border-card">
              <AvatarImage src="/placeholder.svg" alt="John Doe" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
                  <p className="text-muted-foreground">@johndoe</p>
                </div>
                <Button className="mt-3 sm:mt-0 bg-primary hover:bg-primary-hover">
                  Edit Profile
                </Button>
              </div>
              
              <p className="text-foreground mt-3 leading-relaxed">
                Full-stack developer 👨‍💻 | Love building cool stuff with React & Node.js | 
                Coffee enthusiast ☕ | Always learning something new!
              </p>
              
              {/* Profile metadata */}
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Mumbai, India
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <a href="#" className="text-primary hover:underline">johndoe.dev</a>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined March 2023
                </div>
              </div>
              
              {/* Stats row */}
              <div className="flex gap-6 mt-4">
                <div>
                  <span className="font-bold text-foreground">128</span>
                  <span className="text-muted-foreground ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-bold text-foreground">1,234</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div>
                  <span className="font-bold text-foreground">5,678</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile content tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6">
          <div className="space-y-4">
            {userPosts.map((post, index) => (
              <PostCard
                key={index}
                author={post.author}
                username={post.username}
                time={post.time}
                content={post.content}
                likes={post.likes}
                comments={post.comments}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="replies" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No replies yet. Start engaging with other posts!</p>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No media posts yet. Share some photos or videos!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;