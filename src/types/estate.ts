export type EntityType = 'active' | 'passive';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  description: string;
  ownership: string;
  revenue: number;
  position?: {
    x: number;
    y: number;
  };
}