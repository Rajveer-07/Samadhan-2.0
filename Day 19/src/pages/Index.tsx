import UserProfile from "@/components/UserProfile";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";

// Main feed page - ab sirf center content hai, sidebar alag hai
const Index = () => {
  // Sample posts data - ye normally backend se aayega
  const samplePosts = [
    {
      author: "Rahul Kumar",
      username: "rahul_dev",
      time: "2h",
      content: "Just shipped a new feature! React mein kaam karna is so much fun. TypeScript ke saath everything feels so organized. 🚀",
      likes: 24,
      comments: 5
    },
    {
      author: "Priya Sharma",
      username: "priya_designs",
      time: "4h",
      content: "Working on some UI designs today. Minimalism is the key! Less is more when it comes to user experience. What do you think?",
      likes: 18,
      comments: 3
    },
    {
      author: "Tech Guru",
      username: "techguru_2024",
      time: "6h",
      content: "Hot take: Simple code > Complex code. Agar koi junior developer tumhara code samajh nahi sakta, toh probably over-engineered hai. Keep it simple, folks! 💡",
      likes: 67,
      comments: 12
    },
    {
      author: "Anjali Patel",
      username: "anjali_codes",
      time: "8h", 
      content: "Weekend project done! Built a small todo app with React hooks. Nothing fancy, but man the satisfaction of completing something is unmatched! 💪",
      likes: 31,
      comments: 8
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main feed - center content, ab zyada space mil gaya */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <CreatePost />
            {samplePosts.map((post, index) => (
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
        </div>

        {/* Right sidebar - user profile aur trending */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <UserProfile />
            
            {/* Trending section - extra content for better UX */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">Trending Topics</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium text-foreground">#ReactJS</p>
                  <p className="text-muted-foreground">1,234 posts</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">#TypeScript</p>
                  <p className="text-muted-foreground">987 posts</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">#WebDev</p>
                  <p className="text-muted-foreground">2,456 posts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
