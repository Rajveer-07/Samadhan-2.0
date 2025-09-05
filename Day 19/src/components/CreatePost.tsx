import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Smile } from "lucide-react";

// Create new post component - simple post creation form
const CreatePost = () => {
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    if (postContent.trim()) {
      // Yaha actual post creation logic aayegi later
      console.log("New post:", postContent);
      setPostContent("");
    }
  };

  return (
    <Card className="shadow-card border-border mb-6">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" alt="You" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="What's happening? Share karo..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[100px] resize-none border-none shadow-none text-base placeholder:text-muted-foreground focus-visible:ring-0 p-0"
            />
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="text-social-comment">
                  <ImagePlus className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-social-comment">
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                onClick={handlePost}
                disabled={!postContent.trim()}
                className="bg-primary hover:bg-primary-hover text-primary-foreground disabled:opacity-50"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;