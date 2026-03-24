export const fetchSuggestions = async (input: string) => {
   const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
   
   try {
      const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'suggestions.placePrediction.text,suggestions.placePrediction.placeId'
         },
         body: JSON.stringify({
            input,
            locationBias: {
                  circle: {
                     center: { latitude: 9.0820, longitude: 8.6753 },
                     radius: 50
                  }
            }
         })
      });

      if (!response.ok) throw new Error('Autocomplete fetch failed');
      const data = await response.json();
      return data.suggestions || [];
   } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
   }
};