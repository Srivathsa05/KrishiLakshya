export interface Crop {
  id: string;
  userId: string;
  name: string;
  area: number;
  areaUnit: string;
  plantingDate: Date;
  season: string;
  status: 'active' | 'harvested';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
