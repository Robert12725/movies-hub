import { useState, useEffect } from "react";
import moviesData from "./movies.json"; 

export default function UseMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // შეცდომის სტატუსი

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setError(null); // ვასუფთავებთ შეცდომებს

      const timer = setTimeout(() => {
        try {
          if (!moviesData || moviesData.length === 0) {
            throw new Error("Movie data is empty or corrupted.");
          }
          
          setMovies(moviesData);
          setLoading(false);
          
        } catch (e) {
          console.error("Data loading error:", e);
          setError(e);
          setLoading(false);
        }
      }, 500); 

      return () => clearTimeout(timer); // Cleanup function
    };

    fetchData();
  }, []); 
  return { movies, loading, error };
}
