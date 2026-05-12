"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, FileText, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { getBlogPosts } from "@/actions/blog";
import Image from "next/image";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (error) {
        toast.error("Failed to load blog posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold font-heading">Blog Management</h1>
          <p className="text-muted-foreground">Write and manage your travel stories.</p>
        </div>
        <Button className="rounded-full px-6">
          <Plus className="w-4 h-4 mr-2" /> New Article
        </Button>
      </div>

      <Card className="rounded-[2rem] border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-border bg-slate-50/50 dark:bg-zinc-900/50 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 rounded-full bg-white dark:bg-zinc-950" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-xs uppercase font-black tracking-widest text-muted-foreground">
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8">
                        <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded w-1/2 mb-2" />
                        <div className="h-3 bg-slate-50 dark:bg-zinc-900 rounded w-1/3" />
                      </td>
                    </tr>
                  ))
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-medium">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      No articles found.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                            <Image src={post.image} alt={post.title} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold line-clamp-1">{post.title}</p>
                            <p className="text-xs text-muted-foreground">by {post.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Badge variant="outline" className="rounded-full">{post.category}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        {post.published ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none font-bold">Published</Badge>
                        ) : (
                          <Badge variant="secondary" className="font-bold">Draft</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white dark:hover:bg-zinc-800 shadow-sm border border-transparent hover:border-border">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
