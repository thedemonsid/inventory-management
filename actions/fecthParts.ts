"use server";
import { prisma } from "@/lib/prisma";
type SafePart = {
  id: string;
  code: string | null;
  name: string;
  quantity: number;
  purchasePrice: number;
  mrp: number;
  sellingPrice: number;
  category: 'ACCESSORIES' | 'SPARE_PARTS' | 'FIBER';
  rackNumber: string;
  createdAt: Date;
  updatedAt: Date;
  vectorEmbed: number[];
};

export const fetchParts = async () => {
  try {
    const parts = await prisma.part.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!parts.length) {
      return {
        success: false,
        message: "No parts found",
        parts: []
      };
    }

    // Convert Decimal to number for client-side rendering
    const safeParts: SafePart[] = parts.map(part => ({
      ...part,
      purchasePrice: Number(part.purchasePrice),
      mrp: Number(part.mrp),
      sellingPrice: Number(part.sellingPrice)
    }));

    return {
      success: true,
      message: "Parts fetched successfully",
      parts: safeParts
    };
  } catch (error) {
    console.error('Error fetching parts:', error);
    return {
      success: false,
      message: "Server Side error while fetching parts",
      parts: []
    };
  }
};
