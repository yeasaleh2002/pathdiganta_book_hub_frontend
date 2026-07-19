"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Author {
  id?: string;
  _id?: string;
  name: string;
}

interface Publisher {
  id?: string;
  _id?: string;
  name: string;
}

interface Props {
  authors?: Author[];
  publishers?: Publisher[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export const AuthorPublisherBlock = ({
  authors = [],
  publishers = [],
}: Props) => {
  const displayAuthors = authors.length > 0 ? authors.slice(0, 6) : [];
  const displayPublishers = publishers.length > 0 ? publishers.slice(0, 6) : [];

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:from-transparent dark:via-gray-900/20 dark:to-transparent border-y border-gray-100/50 dark:border-gray-800/50 my-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
        {/* Authors */}
        <div className="relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:w-1/2 after:h-[4px] after:bg-blue-600 after:rounded-full">
              Top Authors
            </h2>
            <Link
              href="/authors"
              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors flex items-center group"
            >
              View All{" "}
              <ArrowRight
                size={16}
                className="ml-1 transform group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
          {displayAuthors.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-3 sm:grid-cols-3 gap-x-6 gap-y-10"
            >
              {displayAuthors.map((author, idx) => (
                <motion.div
                  key={author.id || author._id || idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link
                    href={`/books?author=${encodeURIComponent(author?.name || "")}`}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white dark:bg-gray-800 border-4 border-gray-100 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-500 shadow-md flex items-center justify-center text-3xl font-black text-gray-400 dark:text-gray-500 transition-all z-10 relative">
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-blue-500 group-hover:to-blue-700 dark:group-hover:from-blue-400 dark:group-hover:to-blue-600">
                          {getInitials(author?.name || "")}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm md:text-base font-bold text-center text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight px-2">
                      {author?.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-gray-500 py-10 text-center">
              No authors found.
            </div>
          )}
        </div>

        {/* Publishers */}
        <div className="relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-3xl -z-10" />
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white relative after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:w-1/2 after:h-[4px] after:bg-purple-600 after:rounded-full">
              Top Publishers
            </h2>
            <Link
              href="/publishers"
              className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-800 transition-colors flex items-center group"
            >
              View All{" "}
              <ArrowRight
                size={16}
                className="ml-1 transform group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
          {displayPublishers.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-5"
            >
              {displayPublishers.map((pub, idx) => (
                <motion.div
                  key={pub.id || pub._id || idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Link
                    href={`/books?publisher=${encodeURIComponent(pub?.name || "")}`}
                    className="flex items-center justify-center p-6 bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all h-28 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-colors" />
                    <span className="font-extrabold text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-center line-clamp-2 z-10 text-sm md:text-base">
                      {pub?.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-gray-500 py-10 text-center">
              No publishers found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
