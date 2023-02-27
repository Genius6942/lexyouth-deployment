import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../lib/auth";

export default function Home() {
  const { authenticated, token, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated()) navigate('/dashboard/teacher');
  }, [token])
  return (
    <>
      <div>welcome home.</div>
      {!authenticated() ? (
        <Link to="login">Log In</Link>
      ) : (
        <Button onClick={() => logout()} variant="contained">
          Log Out
        </Button>
      )}
    </>
  );
}
