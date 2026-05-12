"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowLeft, Loader2, Share2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug } from "@/actions/blog";

export default function BlogPostDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogPostBySlug(slug as string);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold font-heading">Article Not Found</h1>
        <Button asChild className="rounded-full">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-12 font-bold transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" /> Back to Blog
        </Link>

        <header className="mb-12">
          <Badge className="mb-6 bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-xs">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight mb-8 tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between py-8 border-y border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-bold text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()} • 5 min read</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bookmark className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </header>

        <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-primary/5">
          <Image 
            src={post.image || "/placeholder-blog.jpg"} 
            alt={post.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl font-medium text-muted-foreground leading-relaxed mb-8 italic">
            {post.excerpt}
          </p>
          <div className="text-foreground leading-loose space-y-6">
            {post.content}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </article>

        <footer className="mt-24 pt-12 border-t border-border">
          <div className="bg-slate-50 dark:bg-zinc-900 rounded-[2.5rem] p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Enjoyed this story?</h3>
            <p className="text-muted-foreground mb-8">Subscribe to our newsletter to receive the latest travel stories and exclusive deals directly in your inbox.</p>
            <Button asChild className="rounded-full px-12 h-14 text-lg font-bold">
              <Link href="/contact">Join the Community</Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
