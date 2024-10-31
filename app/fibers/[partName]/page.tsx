import { BikeModelPartsPageComponent } from "@/components/bike-model-parts-page";
import { PartsListPageComponent } from "@/components/parts-list-page";
import React from "react";

const Parts = async ({ params }: any) => {
  const { partName } = await params;
  return <PartsListPageComponent category={partName} />;
};

export default Parts;
