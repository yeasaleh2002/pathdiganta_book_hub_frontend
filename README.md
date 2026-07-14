# Pathdigonto Book Hub - Frontend Architecture

> A high-traffic, secure, single-vendor online bookstore engineered with Next.js 14+ (App Router), Tailwind CSS, TypeScript, and Zustand.

## 🚀 Modern Setup Guide

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation Pipeline
1. Clone the repository to your local machine.
2. Install dependencies securely:
```bash
npm install
```
3. Establish your environment matrix. Create a `.env.local` file at the root:
```env
# Core API Router Hook (Connects to internal structural DB)
NEXT_PUBLIC_API_BASE_URL="https://pathdiganta-book-hub-backend.vercel.app"

# External Asset Storage API (ImgBB)
NEXT_PUBLIC_IMGBB_API_KEY="your_imgbb_api_key_here"
```
4. Launch the local development server:
```bash
npm run dev
```

## 🗺️ Comprehensive Site Directory Map

### Public Ecosystem (Mixed Components)
- **`/`** `(Server Component)`: Dynamic Homepage Grid (Carousels & Recommendations)
- **`/books`** `(Server Component + Client Filters)`: Advanced Inventory Search Explorer
- **`/book/[id]`** `(Server Component)`: SEO-Optimized Product Details Hub
- **`/about`**, **`/terms`**, **`/privacy`** `(Static Server Components)`: Legal & Information Nodes

### Authenticated Customer Matrix (Client Wrappers)
- **`/login`**, **`/register`** `(Client Components)`: Secure OTP Authentication Flows
- **`/dashboard`** `(Client Component)`: Unified Account Matrix (Profile, Address, Orders)
- **`/checkout`** `(Client Component)`: Secure Two-Step Transaction Funnel (Protected)
- **`/order-confirmation/[id]`** `(Server Component)`: Text-Format Invoice Generator

### Administrative Command Deck (Protected Operations)
- **`/admin/dashboard`** `(Client Component)`: Metrics & Analytics Performance Matrix
- **`/admin/orders`** `(Client Component)`: Pipeline Order Processing Console
- **`/admin/inventory`** `(Client Component)`: Global Catalog Master Table
- **`/admin/inventory/new`** `(Client Component)`: Book Creation Asset Uploader Hub
- **`/admin/categories`** `(Client Component)`: Dynamic Category CRUD Hub
- **`/admin/promotions`** `(Client Component)`: Combo Bundle Designer
- **`/admin/coupons`** `(Client Component)`: Marketing Promo Code Engine

## ⚡ Core System Optimization Manual

### Incremental Static Regeneration (ISR) Architecture
Pathdigonto utilizes robust ISR and Next.js App Router cache invalidations to guarantee blistering fast load times for global users, whilst simultaneously preventing dangerous "Overselling" of inventory.

**How Inventory Stock Updates Globally:**
1. **The Event Triggers**: 
   - A customer completely passes the `/checkout` sequence.
   - An administrator edits a book's active stock via the `/admin/inventory` table.
2. **The Revalidation Hook**: The frontend fires an internal API request mapping to `revalidateTag('inventory')` or directly calls `revalidatePath('/books')` utilizing Next.js Server Actions.
3. **The Global Refresh**: Next.js automatically purges the specific edge-cached CDN HTML elements for the affected `/book/[id]` and the global `/books` grid in the background. The very next user who visits will instantly observe the precise updated stock integer without any manual server redeployment. 

### Global Lazy Loading Strategy
Heavy UI components (e.g., `CartDrawer`, `MobileMenuDrawer`, and massive Search modals) are strictly isolated using `next/dynamic`. This cuts the initial JavaScript payload radically, allowing the core content to hydrate instantaneously.

### Theming System
The UI utilizes Tailwind's `class` based dark-mode structure mapping to CSS Custom Properties. `next-themes` manages the persistent state to avoid rendering flashes.
