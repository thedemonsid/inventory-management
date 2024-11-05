"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, MapPin, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Part {
  id: string;
  code: string | null;
  name: string;
  quantity: number;
  purchasePrice: number;
  mrp: number;
  sellingPrice: number;
  category: 'ACCESSORIES' | 'SPARE_PARTS' | 'FIBER';
  rackNumber: string;
  vectorEmbed: number[];
}

interface Cart {
  [key: string]: number;
}

export function PartsListPageComponent({ parts }: { parts: Part[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Cart>({});

  const filteredParts = parts.filter(
    (part) =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (part.code?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      part.rackNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (partId: string) => {
    setCart((prevCart: Cart) => ({
      ...prevCart,
      [partId]: (prevCart[partId] || 0) + 1,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Parts Inventory
          </h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search parts, codes, or rack numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col p-4">
        <ScrollArea className="flex-grow">
          <div className="space-y-4">
            {filteredParts.map((part) => (
              <div key={part.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt={part.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{part.name}</h3>
                    <p className="text-sm text-gray-500">Code: {part.code}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-yellow-700 mr-1" />
                      <span className="text-sm font-medium text-yellow-700">
                        Rack: {part.rackNumber}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-1">
                      {part.quantity}
                    </div>
                    <span className="text-sm text-gray-500">In Stock</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-1">
                    <p className="text-sm bg-red-600 px-2 rounded-sm">
                      <span className="font-medium">Purchase:</span> ₹{part.purchasePrice}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">MRP:</span> ₹{part.mrp}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      ₹{part.sellingPrice}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => addToCart(part.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart ({cart[part.id] || 0})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>

      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Inventory Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
