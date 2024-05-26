export const generateMockProducts = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    type: `Type ${index + 1}`,
    name: `Product ${index + 1}`,
    price: 10 + index,
    discount: index * 0.5,
    image: `product${index + 1}.jpg`,
    overview: 'overview',
    description: 'description',
    additionalInfo: 'info',
  }));
};
