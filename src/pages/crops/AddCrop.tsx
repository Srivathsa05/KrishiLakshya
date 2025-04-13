import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Plus } from 'lucide-react';

const Crops: React.FC = () => {
  const { crops } = useData();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Leaf className="h-6 w-6 text-krishi-green mr-2" />
          <h1 className="text-2xl font-bold">My Crops</h1>
        </div>
        <Button
          className="bg-krishi-green hover:bg-krishi-green-dark"
          onClick={() => navigate('/crops/add')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Crop
        </Button>
      </div>

      {crops.length === 0 ? (
        <p className="text-gray-600">No crops added yet. Click "Add Crop" to get started.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crops.map((crop, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{crop.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-gray-700">
                <p><strong>Area:</strong> {crop.area} {crop.areaUnit}</p>
                <p><strong>Season:</strong> {crop.season}</p>
                <p><strong>Status:</strong> {crop.status}</p>
                <p><strong>Planted:</strong> {new Date(crop.plantingDate).toLocaleDateString()}</p>
                {crop.notes && <p><strong>Notes:</strong> {crop.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Crops;
