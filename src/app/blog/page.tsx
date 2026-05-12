"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/actions/blog";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";


export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const fallbackPosts = [
    {
      id: "fallback-b0",
      title: "Top Budget-Friendly National Parks, Hotels, and Beaches",
      slug: "budget-adventure-guide",
      excerpt: "Adventure travel doesn’t have to drain your savings. Discover the world's most breathtaking budget-friendly destinations.",
      image: "https://images.unsplash.com/photo-1533724141066-40df10444f3c75?q=80&w=1080&auto=format&fit=crop",
      author: "Adventure Guide",
      category: "Budget Travel",
      createdAt: new Date().toISOString()
    },
    {
      id: "fallback-b1",

      title: "10 Tips for Your First African Safari",
      slug: "tips-first-african-safari",
      excerpt: "Everything you need to know before heading into the wild. From what to pack to the best time to visit.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080&auto=format&fit=crop",
      author: "Jane Traveler",
      category: "Travel Tips",
      createdAt: new Date().toISOString()
    },
    {
      id: "fallback-b2",
      title: "The Ultimate Guide to Zanzibar's Best Beaches",
      slug: "zanzibar-beach-guide",
      excerpt: "Discover the hidden gems of the spice island. Crystal clear waters and white sand await you.",
      image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1080&auto=format&fit=crop",

      author: "Marcus Beach",
      category: "Destinations",
      createdAt: new Date().toISOString()
    }
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 pt-32 pb-24 px-6">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Travel Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stories, tips, and inspiration from the world of travel. Join us as we explore the most beautiful corners of our planet.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center py-24">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-2xl font-bold">No articles found. Check back soon!</h2>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {displayPosts[0] && (
              <div className="mb-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative h-[500px] rounded-[3rem] overflow-hidden cursor-pointer"
                >
                  <Image 
                    src={displayPosts[0].image || "/placeholder-blog.jpg"} 
                    alt={displayPosts[0].title} 
                    fill 
                    sizes="100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12">
                    <Badge className="mb-4 bg-primary text-white border-none px-4 py-1">Featured Article</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
                      {displayPosts[0].title}
                    </h2>
                    <p className="text-white/80 text-lg mb-6 max-w-2xl line-clamp-2">
                      {displayPosts[0].excerpt}
                    </p>
                    <div className="flex items-center space-x-6 text-white/70 text-sm">
                      <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {displayPosts[0].author}</div>
                      <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(displayPosts[0].createdAt).toLocaleDateString()}</div>
                      <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> 5 min read</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {displayPosts.slice(1).map((post, index) => (

                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col"
                >
                  <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                    <Image 
                      src={post.image || "/placeholder-blog.jpg"} 
                      alt={post.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-foreground font-medium border-none">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 5 min read</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <Button asChild variant="ghost" className="p-0 h-auto font-bold text-primary hover:bg-transparent flex items-center self-start group/btn">
                    <Link href={`/blog/${post.slug}`}>
                      Read Article <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </>
        )}


        <div className="mt-20 text-center">
          <Button variant="outline" className="rounded-full h-12 px-8">Load More Articles</Button>
        </div>
      </div>
    </div>
  );
}
