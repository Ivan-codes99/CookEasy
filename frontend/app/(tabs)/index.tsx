import { useEffect } from "react";
import { Redirect } from "expo-router";

export default function Index() {
  // Instantly redirect to /auth when app starts
  return <Redirect href="/auth" />;
}
