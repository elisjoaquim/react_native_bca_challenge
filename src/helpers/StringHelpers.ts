import { TVehicles } from '../redux/store/reducers/vehicleReducer/type';

export const filterVehicles = (vehicles: TVehicles[], searchTerm: string) => {
  return vehicles.filter(
    vehicle =>
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.toString().includes(searchTerm) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.startingBid >= parseFloat(searchTerm),
  );
};

export const highlightMatchingString = (
  text: string,
  queryStr: string,
): {
  firstPart?: string;
  highLighted?: string;
  lastPart?: string;
  text?: string;
} => {
  if (!queryStr) return { text };

  let queryLower = queryStr.toLocaleLowerCase();
  let textToLower = text.toLocaleLowerCase();

  const index = textToLower.indexOf(queryLower);

  if (index === -1) return { text };

  const firstPart = text.slice(0, index);
  const highLighted = text.slice(index, index + queryLower.length);
  const lastPart = text.slice(index + queryStr.length);

  return { firstPart, highLighted, lastPart };
};

export const formatPriceToCurrency = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
