"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Part {
  id: string;
  code: string;
  name: string;
  part: string;
  qty: number;
  mrp: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export function PartsListPageComponent({
  category = "TP",
  parts,
}: {
  category: string;
  parts: Part[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Split the search term into individual words, remove extra spaces, and convert to lowercase
  const terms = searchTerm
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 0); // Remove empty strings

  const filteredParts = parts.filter((part) => {
    // Ensure the part matches the selected category
    if (part.part !== category) return false;

    // Check if all search terms are present in either the name or code
    return terms.every((term) => {
      const nameIncludes = part.name.toLowerCase().includes(term);
      const codeIncludes = part.code.toLowerCase().includes(term);
      return nameIncludes || codeIncludes;
    });
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
          <Link href="/fibers" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{category} Parts</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col p-4">
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search parts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <ScrollArea className="flex-grow">
          <div className="space-y-4">
            {filteredParts.map((part) => (
              <div
                key={part.code}
                className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{part.name}</h3>
                  <p className="text-sm text-gray-500">Code: {part.code}</p>
                  <p className="text-sm text-gray-500">MRP: ₹{part.mrp}</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {part.qty}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>

      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2023 Inventory Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
