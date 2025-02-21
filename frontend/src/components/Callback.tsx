import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const fetchToken = async () => {
      if (code) {
        try {
          const response = await fetch("http://localhost:3000/api/spotify/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch access token");
          }

          const data = await response.json();

          if (data.access_token) {
            localStorage.setItem("spotify_access_token", data.access_token);
            window.location.href = "/"; // Redirect to home page
          } else {
            throw new Error("No access token received");
          }
        } catch (error) {
          console.error("Error fetching token:", error);
          // Optional: Show an error message to the user, e.g., alert or a toast notification
          // alert("Authentication failed. Please try again.");
        }
      }
    };

    fetchToken();
  }, [code]);

  return <p>Authenticating...</p>;
};

export default SpotifyCallback;
