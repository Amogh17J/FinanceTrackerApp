import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCurrency(baseCurrency = 'INR') {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
        );
        setRates(response.data.conversion_rates);
      } catch (err) {
        setError('Failed to fetch exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  const convert = (amount, toCurrency) => {
    if (!rates[toCurrency]) return amount;
    return (amount * rates[toCurrency]).toFixed(2);
  };

  return { rates, loading, error, convert };
}