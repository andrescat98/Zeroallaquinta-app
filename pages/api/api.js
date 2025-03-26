export const fetchCountries = async () => {
    try {
      const response = await fetch('https://vyhzhwvrivovhspyefpb.supabase.co/rest/v1/countries', {
        method: 'GET',
        headers: {
          'apikey': 'your-api-key',  // Sostituisci con la tua chiave API effettiva
          'Authorization': 'Bearer your-access-token',
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Errore nella richiesta: ' + response.status);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Errore nella chiamata API: ' + error.message);
    }
  };
  