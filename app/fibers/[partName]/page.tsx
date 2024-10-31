import { PartsListPageComponent } from "@/components/parts-list-page";
import { prisma } from "@/lib/prisma";
import { Part } from "@prisma/client";

import React from "react";

const Parts = async ({ params }: { params: Promise<{ partName: string }> }) => {
  const { partName } = await params;
  const parts = await prisma.fiber.findMany({
    where: {
      part: partName as Part,
    },
  });
  return <PartsListPageComponent category={partName} parts={parts} />;
};

export default Parts;
