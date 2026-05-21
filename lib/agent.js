import messData from '../data/messData.json';

// Get current time of day
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'night';
}

// Get food suggestion based on time
function getFoodSuggestion() {
  const timeOfDay = getTimeOfDay();
  if (timeOfDay === 'morning') return 'breakfast';
  if (timeOfDay === 'afternoon') return 'meals';
  return 'dinner';
}

// Predict crowd level based on time
function predictCrowdLevel() {
  const hour = new Date().getHours();
  if (hour >= 12 && hour <= 14) return 'high';
  if (hour >= 19 && hour <= 21) return 'high';
  if (hour >= 8 && hour <= 9) return 'medium';
  return 'low';
}

// Get delivery status based on delivery time
function getDeliveryStatus(deliveryTime) {
  if (deliveryTime <= 15) return 'fast';
  if (deliveryTime <= 25) return 'normal';
  return 'late';
}

// Check if almost sold out
function isAlmostSoldOut(quantityLeft) {
  return quantityLeft > 0 && quantityLeft <= 10;
}

// Main agent function
export function messAgent(userInput = '') {
  const timeOfDay = getTimeOfDay();
  const foodSuggestion = getFoodSuggestion();
  const crowdLevel = predictCrowdLevel();
  
  // Convert input to lowercase for keyword matching
  const input = userInput.toLowerCase();
  
  // Identify keywords
  const keywords = {
    cheap: input.includes('cheap') || input.includes('budget') || input.includes('affordable'),
    veg: input.includes('veg') || input.includes('vegetarian'),
    nonVeg: input.includes('non-veg') || input.includes('non veg') || input.includes('nonveg'),
    fast: input.includes('fast') || input.includes('quick') || input.includes('speed')
  };
  
  // Filter mess data
  let filteredMess = messData.filter(mess => {
    // Remove sold out items
    if (mess.quantityLeft === 0) return false;
    
    // Apply keyword filters
    if (keywords.cheap && mess.price > 70) return false;
    if (keywords.veg && mess.type !== 'veg') return false;
    if (keywords.nonVeg && mess.type !== 'non-veg') return false;
    if (keywords.fast && mess.deliveryTime > 15) return false;
    
    return true;
  });
  
  // If no filters applied, use all available mess
  if (filteredMess.length === 0 && !Object.values(keywords).some(k => k)) {
    filteredMess = messData.filter(mess => mess.quantityLeft > 0);
  }
  
  // Sort by rating (highest first)
  filteredMess.sort((a, b) => b.rating - a.rating);
  
  // Select best option
  const bestOption = filteredMess.length > 0 ? filteredMess[0] : null;
  
  // Prepare result with additional intelligence
  const result = {
    bestOption: bestOption ? {
      ...bestOption,
      crowdLevel,
      deliveryStatus: getDeliveryStatus(bestOption.deliveryTime),
      almostSoldOut: isAlmostSoldOut(bestOption.quantityLeft),
      foodSuggestion,
      whatsapp: bestOption.whatsapp
    } : null,
    allAvailable: filteredMess.map(mess => ({
      ...mess,
      crowdLevel,
      deliveryStatus: getDeliveryStatus(mess.deliveryTime),
      almostSoldOut: isAlmostSoldOut(mess.quantityLeft),
      foodSuggestion,
      whatsapp: mess.whatsapp
    })),
    timeOfDay,
    foodSuggestion,
    crowdLevel,
    keywords
  };
  
  return result;
}
