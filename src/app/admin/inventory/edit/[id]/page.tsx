"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, X, Loader2, Save, AlertCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://pathdiganta-book-hub-backend.vercel.app";

type DropdownItem = { id: string; name: string };

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const unwrappedParams = React.use(params);
  const bookId = unwrappedParams.id;
  
  const [formData, setFormData] = useState({
    title: '', authorId: '', publisherId: '', isbn: '', price: '', categoryId: '', description: '', stock: ''
  });
  
  const [categories, setCategories] = useState<DropdownItem[]>([]);
  const [authors, setAuthors] = useState<DropdownItem[]>([]);
  const [publishers, setPublishers] = useState<DropdownItem[]>([]);

  // Inline Creation State
  const [isCreatingAuthor, setIsCreatingAuthor] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [isCreatingPublisher, setIsCreatingPublisher] = useState(false);
  const [newPublisherName, setNewPublisherName] = useState('');

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catRes, authRes, pubRes, bookRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/categories`),
          fetch(`${API_URL}/api/v1/authors`),
          fetch(`${API_URL}/api/v1/publishers`),
          fetch(`${API_URL}/api/v1/books/${bookId}`)
        ]);
        
        const catData = await catRes.json();
        const authData = await authRes.json();
        const pubData = await pubRes.json();
        const bookData = await bookRes.json();
        
        if (catData.success) setCategories(catData.categories);
        if (authData.success) setAuthors(authData.authors);
        if (pubData.success) setPublishers(pubData.publishers);
        
        if (bookData.success && bookData.book) {
          const b = bookData.book;
          setFormData({
            title: b.title,
            authorId: b.authorId,
            publisherId: b.publisherId,
            isbn: b.isbn,
            price: b.price.toString(),
            categoryId: b.categoryId,
            description: b.description || '',
            stock: b.stock.toString()
          });
          if (b.imageUrls && b.imageUrls.length > 0) {
            setPreviewUrls(b.imageUrls);
            // We cannot edit existing external URL files here easily, 
            // so if they choose new files, we replace, otherwise we keep existing
          }
        }
      } catch (error) {
        console.error("Failed to load metadata", error);
      }
    };
    fetchMetadata();
  }, [bookId]);

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

  const createMissingEntities = async () => {
    const token = localStorage.getItem('token');
    let finalAuthorId = formData.authorId;
    let finalPublisherId = formData.publisherId;

    if (isCreatingAuthor && newAuthorName) {
      const res = await fetch(`${API_URL}/api/v1/admin/authors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: newAuthorName })
      });
      const data = await res.json();
      if(data.success) {
        finalAuthorId = data.author.id;
      } else {
        throw new Error("Failed to dynamically create author.");
      }
    }

    if (isCreatingPublisher && newPublisherName) {
      const res = await fetch(`${API_URL}/api/v1/admin/publishers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: newPublisherName })
      });
      const data = await res.json();
      if(data.success) {
        finalPublisherId = data.publisher.id;
      } else {
        throw new Error("Failed to dynamically create publisher.");
      }
    }

    return { finalAuthorId, finalPublisherId };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(images.length === 0) return alert("Validation Error: Please select at least one cover image asset.");
    
    setIsUploading(true);
    try {
      // 0. Pre-flight entity creation
      const { finalAuthorId, finalPublisherId } = await createMissingEntities();

      if (!finalAuthorId || !finalPublisherId) {
         throw new Error("Missing author or publisher ID mappings.");
      }

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
        title: formData.title,
        categoryId: formData.categoryId,
        authorId: finalAuthorId,
        publisherId: finalPublisherId,
        isbn: formData.isbn,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description,
        ...(uploadedUrls.length > 0 ? { imageUrls: uploadedUrls } : {})
      };

      // 3. Put to Internal API routing
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/v1/admin/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(finalPayload)
      });
      const data = await response.json();

      if (data.success) {
        setIsUploading(false);
        alert("Success: Book structurally modified and deployed to global catalog.");
        router.push('/admin/inventory');
      } else {
        alert(data.message || "Failed to update book");
        setIsUploading(false);
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Asset pipeline failed. Check console for details.");
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Catalog Mutation Hub</h1>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">Update existing title directly in the global inventory matrix.</p>
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
              <input required placeholder="e.g. The Clean Coder" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400 placeholder:font-bold" />
            </div>
            
            {/* Dynamic Author Selection */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Author</label>
              {isCreatingAuthor ? (
                <div className="relative">
                  <input autoFocus required placeholder="Enter new author name..." value={newAuthorName} onChange={e => setNewAuthorName(e.target.value)} className="w-full p-4 border-2 border-blue-500 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none pr-12 transition-colors placeholder:text-gray-400 placeholder:font-bold" />
                  <button type="button" onClick={() => { setIsCreatingAuthor(false); setNewAuthorName(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"><X size={16} /></button>
                </div>
              ) : (
                <div className="relative flex items-center">
                  <select required value={formData.authorId} onChange={e => {
                    if (e.target.value === 'new') { setIsCreatingAuthor(true); setFormData({...formData, authorId: ''}); } 
                    else { setFormData({...formData, authorId: e.target.value}); }
                  }} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors appearance-none">
                    <option value="">Select Author...</option>
                    <option value="new" className="font-black text-blue-600">➕ Add New Author...</option>
                    {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
              )}
            </div>
            
            {/* Dynamic Publisher Selection */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Publisher</label>
              {isCreatingPublisher ? (
                <div className="relative">
                  <input autoFocus required placeholder="Enter new publisher name..." value={newPublisherName} onChange={e => setNewPublisherName(e.target.value)} className="w-full p-4 border-2 border-blue-500 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none pr-12 transition-colors placeholder:text-gray-400 placeholder:font-bold" />
                  <button type="button" onClick={() => { setIsCreatingPublisher(false); setNewPublisherName(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"><X size={16} /></button>
                </div>
              ) : (
                <div className="relative flex items-center">
                  <select required value={formData.publisherId} onChange={e => {
                    if (e.target.value === 'new') { setIsCreatingPublisher(true); setFormData({...formData, publisherId: ''}); } 
                    else { setFormData({...formData, publisherId: e.target.value}); }
                  }} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors appearance-none">
                    <option value="">Select Publisher...</option>
                    <option value="new" className="font-black text-blue-600">➕ Add New Publisher...</option>
                    {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Category Taxonomy Link</label>
              <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors appearance-none">
                <option value="">Select Category...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Unique ISBN Registry</label>
              <input required placeholder="e.g. 978-3-16-148410-0" value={formData.isbn} onChange={e => setFormData({...formData, isbn: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400 placeholder:font-bold" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">List Price (৳)</label>
                <input required type="number" min="1" placeholder="e.g. 450" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-emerald-600 dark:text-emerald-400 font-black outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-400 placeholder:font-bold" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Stock Yield</label>
                <input required type="number" min="0" placeholder="e.g. 100" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-blue-600 dark:text-blue-400 font-black outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400 placeholder:font-bold" />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs uppercase tracking-widest font-black text-gray-500 mb-2">Marketing Synopsis (Description)</label>
              <textarea rows={4} placeholder="Write a compelling synopsis..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-gray-400 placeholder:font-bold" />
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Visual Asset Mapping</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 group bg-gray-100 dark:bg-gray-900">
                <img src={url} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-600 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                >
                  <X size={16} strokeWidth={3} />
                </button>
              </div>
            ))}
            
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors group cursor-pointer"
            >
              <div className="p-3 bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 rounded-xl transition-colors">
                <UploadCloud size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest text-center px-4">Append Image Frame</span>
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

          <div className="pt-8 border-t-2 border-gray-100 dark:border-gray-800 flex justify-end gap-4">
            <button type="button" onClick={() => router.back()} disabled={isUploading} className="px-8 py-4 text-xs uppercase tracking-widest font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50 cursor-pointer">
              Abort Sequence
            </button>
            <button 
              type="submit" 
              disabled={isUploading}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-transform hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] flex items-center gap-2 disabled:opacity-50 disabled:transform-none cursor-pointer"
            >
              {isUploading ? (
                <><Loader2 size={18} className="animate-spin" /> {uploadProgress}% Transporting Assets...</>
              ) : (
                <><Save size={18} strokeWidth={3} /> Inject Modified Payload</>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
