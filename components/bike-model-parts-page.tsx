"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Sun,
  PanelLeft,
  PanelRight,
  Package,
  HardHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const partsCategories = [
  { name: "Mudguard", icon: Shield },
  { name: "Head Light Visor", icon: Sun },
  { name: "Side Panel", icon: PanelLeft },
  { name: "Tail Panel", icon: PanelRight },
  { name: "Full Kit", icon: Package },
  { name: "Helmet", icon: HardHat },
];

export function BikeModelPartsPageComponent({ bikeName = "Splendor" }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
          <Link href="/fibers" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{bikeName} Parts</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col p-4">
        <div className="grid grid-cols-2 gap-4 flex-grow">
          {partsCategories.map((category, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center justify-center p-4 h-full text-center hover:bg-gray-200 transition-colors"
            >
              <category.icon className="size-24 mb-4" size={128} />
              <span className="text-lg font-medium">{category.name}</span>
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
