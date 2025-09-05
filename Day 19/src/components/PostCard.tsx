import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";

interface PostCardProps {
  author: string;
  username: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  avatar?: string;
}

// Post card component - typical social media post layout
const PostCard = ({ author, username, time, content, likes, comments, avatar }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Card className="shadow-card border-border mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        {/* Post header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={author} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {author.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{author}</h3>
              <p className="text-sm text-muted-foreground">@{username} · {time}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post content */}
        <p className="text-foreground mb-4 leading-relaxed">{content}</p>

        {/* Action buttons - ye bilkul Twitter jaisa hai */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`text-muted-foreground hover:text-social-like hover:bg-social-like-bg transition-colors ${
              isLiked ? 'text-social-like' : ''
            }`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {likeCount}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-social-comment hover:bg-social-comment-bg transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {comments}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-social-share hover:bg-social-share-bg transition-colors"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;