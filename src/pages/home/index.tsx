import { getSubdomainFromUrl } from "@/utils/subdomain";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    console.log(getSubdomainFromUrl(window.location.origin));
  }, []);
  return <>home page</>;
}
