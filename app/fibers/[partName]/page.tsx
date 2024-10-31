import { BikeModelPartsPageComponent } from "@/components/bike-model-parts-page";
import { PartsListPageComponent } from "@/components/parts-list-page";
import { prisma } from "@/lib/prisma";
import React from "react";

const Parts = async ({ params }: any) => {
  const { partName } = await params;
  const parts = await prisma.fiber.findMany({
    where: {
      part: partName,
    },
  });
  return <PartsListPageComponent category={partName} parts={parts} />;
};

export default Parts;
