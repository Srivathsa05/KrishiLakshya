import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ArrowUpCircle } from 'lucide-react';

const AddIncome: React.FC = () => {
  const { crops, addIncome } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [cropId, setCropId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [buyer, setBuyer] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Log crops for debugging
  useEffect(() => {
    console.log('Loaded crops:', crops);
  }, [crops]);

  const amount =
    quantity && pricePerUnit
      ? parseFloat(quantity) * parseFloat(pricePerUnit)
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cropId) {
      toast({
        title: 'Error',
        description: 'Please select a crop.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await addIncome({
        cropId,
        amount,
        quantity: parseFloat(quantity),
        unit,
        pricePerUnit: parseFloat(pricePerUnit),
        buyer,
        date: new Date(date),
        notes,
      });

      toast({
        title: 'Income Added',
        description: `₹${amount} income has been recorded successfully.`,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to add income. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ArrowUpCircle className="w-6 h-6 text-krishi-green" />
            Add Income
          </CardTitle>
          <CardDescription>
            Record income details from your crops
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Crop</label>
              {crops.length > 0 ? (
                <Select onValueChange={setCropId} value={cropId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.id} value={crop.id}>
                        {crop.name} ({crop.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-muted-foreground italic px-2 py-2 rounded border border-dashed">
                  No crops available. Please add a crop first.
                </div>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Quantity</label>
              <Input
                type="number"
                min="0"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Unit</label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="quintal">Quintals</SelectItem>
                  <SelectItem value="ton">Tons</SelectItem>
                  <SelectItem value="litre">Litres</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block font-medium mb-1">Price per Unit</label>
              <Input
                type="number"
                min="0"
                step="any"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Buyer (Optional)</label>
              <Input
                type="text"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Notes (Optional)</label>
              <Input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button type="submit" disabled={isLoading || crops.length === 0}>
              {isLoading ? 'Saving...' : 'Save Income'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddIncome;
