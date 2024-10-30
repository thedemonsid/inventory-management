import { BikeModelPartsPageComponent } from "@/components/bike-model-parts-page";
import React from "react";

const Parts = async ({ params }: any) => {
  const { bikeName } = await params;
  return <BikeModelPartsPageComponent bikeName={bikeName} />;
};

export default Parts;
