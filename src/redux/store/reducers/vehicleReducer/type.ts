export type TVehiclesState = {
  vehicles: Record<number, TVehicles>;
};

export type TVehicles = {
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
  imageUrl?: string;
  id: number;
};
