export const generateMockBooks = (prefix: string, count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix.toLowerCase()}-${i}`,
    title: `${prefix} Book Title ${i + 1}`,
    author: "Famous Author",
    price: 350 + (i * 20),
    originalPrice: i % 2 === 0 ? 500 + (i * 20) : undefined,
    coverImage: `https://placehold.co/400x600/e2e8f0/64748b?text=Book+${i + 1}`,
    rating: 4.8
  }));
};

export const fetchBookById = async (id: string) => {
  // Simulating Server Fetch Delay
  await new Promise(res => setTimeout(res, 300)); 

  return {
    id,
    title: "The Art of Clean Code Architecture",
    author: "Robert C. Martin",
    publisher: "Prentice Hall",
    category: "Programming",
    language: "English",
    isbn: "978-0132350884",
    pages: 464,
    weight: "800g",
    edition: "1st Edition, 2026",
    price: 850,
    originalPrice: 1200,
    inStock: true,
    tags: ["programming", "software engineering", "coding", "clean code"],
    shortDescription: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    description: "<p>Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way.</p><br/><p>Noted software expert Robert C. Martin presents a revolutionary paradigm with <strong>Clean Code: A Handbook of Agile Software Craftsmanship</strong>. Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code 'on the fly' into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it.</p>",
    images: [
      "https://placehold.co/600x900/0f172a/e2e8f0?text=Cover+1",
      "https://placehold.co/600x900/1e293b/f1f5f9?text=Cover+2",
      "https://placehold.co/600x900/334155/f8fafc?text=Spine"
    ],
    rating: 4.8,
    reviewsCount: 342,
    authorBio: "Robert C. Martin (Uncle Bob) has been a software professional since 1970 and an international software consultant since 1990. He is founder and president of Object Mentor, Inc., a team of experienced consultants who mentor their clients worldwide in C++, Java, C#, C, Ruby, OO, Patterns, UML, Agile Methodologies, and eXtreme programming."
  };
};
