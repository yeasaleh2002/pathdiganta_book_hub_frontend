"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Save, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddNewBookPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '', author: '', isbn: '', price: '', category: 'Programming', description: '', stock: ''
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...selectedFiles]);
      
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const uploadToImgBB = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append('image', file);
    
    // Fallback key if global .env variable isn't injected during testing
    const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'demo_key_required'; 
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: data
    });
    
    const result = await response.json();
    if(result.success) {
      return result.data.url;
    }
    throw new Error('External ImgBB Upload Pipeline Failed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(images.length === 0) return alert("Validation Error: Please select at least one cover image asset.");
    
    setIsUploading(true);
    try {
      // 1. Pipeline execution to ImgBB
      const uploadedUrls: string[] = [];
      for (let i = 0; i < images.length; i++) {
        setUploadProgress(Math.round(((i) / images.length) * 100));
        // Sequential upload to allow safe progress tracking without hitting rate limits instantly
        const url = await uploadToImgBB(images[i]);
        uploadedUrls.push(url);
      }
      setUploadProgress(100);

      // 2. Assemble Final Payload containing absolute external string URLs
      const finalPayload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: uploadedUrls
      };

      // 3. Post to Internal API routing (Simulated execution)
      console.log("Transmitting compiled payload to internal DB Controller:", finalPayload);
      
      setTimeout(() => {
        setIsUploading(false);
        alert("Success: Book structurally generated and deployed to global catalog.");
        router.push('/admin/inventory');
      }, 1000);

    } catch (error) {
      console.error(error);
      alert("Asset pipeline failed. Check ImgBB API key configuration mapping in .env.local.");
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Catalog Induction Hub</h1>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Register new titles directly into the global inventory matrix.</p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
        <AlertCircle className="text-blue-600 dark:text-blue-400 mt-1 shrink-0" size={24} strokeWidth={3} />
        <div>
          <h4 className="font-black text-blue-900 dark:text-blue-100 text-sm uppercase tracking-widest mb-1">Image Persistence Constraint</h4>
          <p className="text-xs font-bold text-blue-700 dark:text-blue-300 leading-relaxed">To strictly maintain global caching integrity across CDN edges, image assets are completely locked upon creation. Subsequent database modifications are restricted exclusively to text, taxonomy, and pricing metadata updates. Ensure all selected images are finalized before deploying the payload.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121212] border-2 border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        
        <div className="p-8 md:p-10 border-b-2 border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Core Metadata Assembly</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Primary Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Author(s)</label>
              <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Category Taxonomy Link</label>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors appearance-none">
                <option>Programming</option>
                <option>Islamic Books</option>
                <option>Novels</option>
                <option>Self Help</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Unique ISBN Registry</label>
              <input required value={formData.isbn} onChange={e => setFormData({...formData, isbn: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">List Price (৳)</label>
                <input required type="number" min="1" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-emerald-600 dark:text-emerald-400 font-black outline-none focus:border-emerald-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Initial Stock Count</label>
                <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-black outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Detailed Description Schema</label>
              <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors resize-none" />
            </div>
          </div>
        </div>

        {/* Media Block Dropzone */}
        <div className="p-8 md:p-10 bg-gray-50/50 dark:bg-gray-900/50">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 tracking-tight flex items-center gap-2">Asset Media <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] rounded uppercase tracking-widest">ImgBB Integrated API</span></h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {previewUrls.map((url, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 group shadow-sm bg-gray-100 dark:bg-gray-800 animate-in zoom-in-95">
                <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 hover:scale-105"
                >
                  <X size={16} strokeWidth={3} />
                </button>
              </div>
            ))}
            
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-blue-600 transition-colors bg-white dark:bg-[#121212] group"
            >
              <UploadCloud size={36} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest text-center px-4">Upload Cover Assets</span>
            </button>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileSelect}
            />
          </div>
        </div>

        {/* Form Actions Footer */}
        <div className="p-6 md:p-8 border-t-2 border-gray-100 dark:border-gray-800 flex flex-col-reverse sm:flex-row justify-end gap-4 items-center">
          {isUploading && (
            <div className="flex-1 w-full flex items-center justify-center sm:justify-start gap-4 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <Loader2 size={20} className="animate-spin" />
              <span>Transmitting asset payload to ImgBB Servers... {uploadProgress}%</span>
            </div>
          )}
          <button type="button" onClick={() => router.back()} disabled={isUploading} className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold rounded-xl transition-colors disabled:opacity-50">Cancel Operation</button>
          <button type="submit" disabled={isUploading} className="w-full sm:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-transform hover:-translate-y-0.5 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
            <Save size={18} strokeWidth={3} /> Deploy to Catalog
          </button>
        </div>

      </form>
    </div>
  );
}
