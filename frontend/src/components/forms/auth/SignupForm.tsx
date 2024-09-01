"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useSignup";
import GoogleAuthProvider from "./GoogleAuthProvider";
import { signIn } from "next-auth/react";

function SignupForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [pwd, setPwd] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorFront, setErrorFront] = React.useState<string | null>(null);

  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !pwd) {
      setErrorFront("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pwd }),
      });

      const response = await res.json();

      if (res.ok) {
        console.log("User registered successfully", response);

        const loginUser = await signIn("credentials", {
          email,
          password: pwd,
          redirect: false,
        });

        if (loginUser?.error) {
          setErrorFront(loginUser.error);
          return;
        }

        router.push("/dashboard");
      } else {
        setErrorFront(response.error || "Une erreur s'est produite.");
      }
    } catch (error) {
      console.error(error);
      setErrorFront("Erreur de connexion. Veuillez réessayer. signup");
    }
  };

  return (
    <div className="flex justify-center items-center px-5 p-10">
      <div className="p-6 rounded-lg py-10 max-w-lg loginForm loginShadow">
        <h2 className="text-3xl mb-5 mt-2 text-center font-bold">Signup</h2>
        <GoogleAuthProvider />
        <div className="grid grid-cols-11 my-2">
          <div className="border-b-2 col-span-5 mb-2"></div>
          <span className="col-span-1 text-center">Or</span>
          <div className="border-b-2 col-span-5 mb-2"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: 1 }}>
            <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
              <TextField
                required
                label="name"
                variant="outlined"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
              <TextField
                required
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        "&:hover": {
                          backgroundColor: "inherit",
                        },
                        "&:focus": {
                          outline: "none",
                        },
                        padding: 0,
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
              />
            </FormControl>

            <div className="ml-5">
              {errorFront && <p className="text-red-500">{errorFront}</p>}
              <Link href={"#"} className="hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="flex justify-center w-full">
              {isLoading ? (
                <button
                  disabled
                  className="my-5 px-10 py-3 w-full md:w-3/5 bg-[#505958c1] text-white font-bold rounded-full"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Signup
                </button>
              ) : (
                <button
                  type="submit"
                  className="my-5 px-10 py-3 w-full md:w-3/5 bg-orange-400 btn hover:bg-orange-500 text-white font-bold rounded-full"
                >
                  Signup
                </button>
              )}
            </div>
            <div className="text-center w-full">
              <p>Already have an account ?</p>
              <Link href={"/signin"} className="font-bold text-xl">
                Login
              </Link>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
