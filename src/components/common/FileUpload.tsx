
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Eye, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  maxSize?: number; // in MB
  onFileChange?: (file: File | null) => void;
  className?: string;
  helpText?: string;
  defaultPreview?: string;
  multiple?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept = "image/*",
  maxSize = 5, // Default 5MB
  onFileChange,
  className,
  helpText,
  defaultPreview,
  multiple = false,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(defaultPreview ? [defaultPreview] : []);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFiles = Array.from(e.target.files);
    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    
    for (const file of selectedFiles) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File ${file.name} exceeds maximum size of ${maxSize}MB`);
        continue;
      }
      
      validFiles.push(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews.push(e.target.result.toString());
            setPreviews(multiple ? [...previews, ...newPreviews] : newPreviews);
          }
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files
        newPreviews.push('');
      }
    }
    
    setFiles(multiple ? [...files, ...validFiles] : validFiles);
    
    if (validFiles.length > 0 && onFileChange) {
      onFileChange(multiple ? validFiles[0] : validFiles[0]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    
    if (onFileChange) {
      onFileChange(newFiles.length > 0 ? newFiles[0] : null);
    }
  };

  const viewFile = (index: number) => {
    if (!previews[index]) return;
    window.open(previews[index], '_blank');
  };

  const isImage = (file: File) => file.type.startsWith('image/');

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      
      <div className="border border-dashed border-input rounded-md p-6 flex flex-col items-center justify-center bg-muted/50">
        <div className="flex flex-col items-center text-center">
          <Upload size={24} className="mb-2 text-muted-foreground" />
          <div className="mb-2 font-medium">
            <label
              htmlFor={id}
              className="cursor-pointer text-primary hover:underline"
            >
              Click to upload
            </label>{" "}
            or drag and drop
          </div>
          <p className="text-xs text-muted-foreground">
            {accept.replace(/\./g, "").toUpperCase()} (Max size: {maxSize}MB)
          </p>
        </div>
        <Input
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          multiple={multiple}
        />
      </div>

      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 rounded-md bg-secondary"
            >
              {previews[index] && isImage(file) ? (
                <div className="h-10 w-10 rounded bg-muted flex-shrink-0 overflow-hidden">
                  <img 
                    src={previews[index]} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <File className="h-10 w-10 p-2 rounded bg-muted flex-shrink-0" />
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              
              <div className="flex gap-1">
                {previews[index] && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => viewFile(index)}
                    className="h-8 w-8"
                  >
                    <Eye size={16} />
                  </Button>
                )}
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 text-destructive"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
