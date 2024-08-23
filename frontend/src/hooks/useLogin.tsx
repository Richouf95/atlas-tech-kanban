import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/store/reducers/auth/authSlice";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const login = async (email: string, pwd: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/user/signin', {
        method: "POST",
        body: JSON.stringify({ email, pwd }),
        headers: { "Content-Type": "application/json" },
      })

      const resultJson = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(resultJson.error || "An error occurred during login.");
        return;
      }

      // Dispatch de l'action login avec les données de l'utilisateur
      dispatch(loginAction(resultJson));

      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return { login, isLoading, error };
};
