"use client";

import Link from "next/link";
import { ArrowLeft, Bike, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const indianBikes = [
  "Hero Splendor",
  "Bajaj Pulsar",
  "Royal Enfield Classic",
  "TVS Apache",
  "Honda Activa",
  "Yamaha FZ",
  "Suzuki Access",
  "KTM Duke",
  "Mahindra Mojo",
  "Jawa Forty Two",
  "Bajaj Avenger",
  "Hero Passion",
  "TVS Jupiter",
];

export function FiberPageComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const filteredBikes = indianBikes.filter((bike) =>
    bike.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleClick(bike: string) {
    console.log("clicked");
    // format the bike name
    bike = bike.toLowerCase().replace(/\s/g, "-");
    router.push(`/fibers/${bike}`);
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Select Bike Model
          </h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search bike models..."
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

        <div className="grid grid-cols-2 gap-4">
          {filteredBikes.map((bike, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center text-center p-2"
              onClick={() => handleClick(bike)}
            >
              <Bike className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">{bike}</span>
            </Button>
          ))}
        </div>
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
