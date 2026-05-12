"use client";

import { useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export const ImageUpload = ({
  value,
  onChange,
  onRemove
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const url = await uploadImage(formData);
      if (typeof url === "string") {
        onChange(url);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Check your Cloudinary credentials.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-xl overflow-hidden border border-border group">
            <div className="z-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                type="button" 
                onClick={() => onRemove(url)} 
                variant="destructive" 
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Uploaded image"
              src={url}
            />
          </div>
        ))}
      </div>
      
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={isUploading}
        />
        <div className={`
          border-2 border-dashed border-border rounded-2xl p-8
          flex flex-col items-center justify-center gap-2
          transition-colors hover:bg-slate-50 dark:hover:bg-zinc-900
          ${isUploading ? "opacity-50" : ""}
        `}>
          {isUploading ? (
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          ) : (
            <Upload className="h-10 w-10 text-muted-foreground" />
          )}
          <div className="text-center">
            <p className="text-sm font-bold">
              {isUploading ? "Uploading..." : "Click to upload an image"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG or WEBP (Max 5MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
