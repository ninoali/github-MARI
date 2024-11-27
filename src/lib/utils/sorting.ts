// Utility function to extract postcode from area string
export const extractPostcode = (area: string): string => {
  const match = area.match(/[A-Z]{1,2}[0-9]+/);
  return match ? match[0] : '';
};

// Compare function for postcodes
export const comparePostcodes = (a: string, b: string): number => {
  // Extract letters and numbers separately
  const aLetters = a.match(/[A-Z]+/)?.[0] || '';
  const bLetters = b.match(/[A-Z]+/)?.[0] || '';
  const aNumbers = parseInt(a.match(/[0-9]+/)?.[0] || '0', 10);
  const bNumbers = parseInt(b.match(/[0-9]+/)?.[0] || '0', 10);

  // Compare letters first
  if (aLetters !== bLetters) {
    return aLetters.localeCompare(bLetters);
  }
  
  // Then compare numbers
  return aNumbers - bNumbers;
};

// Sort areas by postcode
export const sortAreasByPostcode = (areas: string[]): string[] => {
  return [...areas].sort((a, b) => {
    const postcodeA = extractPostcode(a);
    const postcodeB = extractPostcode(b);
    return comparePostcodes(postcodeA, postcodeB);
  });
};