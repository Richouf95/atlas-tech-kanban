import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/store/reducers/auth/authSlice";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const signup = async (name: string, email: string, pwd: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/signup`, {
        method: "POST",
        body: JSON.stringify({ name, email, pwd }),
        headers: { "Content-Type": "application/json" },
      })

      const resultJson = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(resultJson.error || "An error occurred during signing up.");
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

  return { signup, isLoading, error };
};
