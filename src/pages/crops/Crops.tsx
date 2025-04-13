import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { Button } from "@/components/ui/button";

const Crops: React.FC = () => {
  const { crops } = useData();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-krishi-green">Crops</h1>
        <Link to="/crops/add">
          <Button>Add Crop</Button>
        </Link>
      </div>

      {crops.length === 0 ? (
        <p className="text-gray-500">No crops added yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <h2 className="text-lg font-semibold text-krishi-green">
                {crop.name}
              </h2>
              <p>Type: {crop.type}</p>
              <p>Area: {crop.area} acres</p>
              <p>Planted: {new Date(crop.plantingDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Crops;

