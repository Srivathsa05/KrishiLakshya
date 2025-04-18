export interface Crop {
  id: string;
  userId: string;
  name: string;
  type: string; // 👈 Add this line
  area: number;
  areaUnit: string;
  plantingDate: Date;
  season: string;
  expectedHarvestDate: Date;
  status: 'active' | 'harvested';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
