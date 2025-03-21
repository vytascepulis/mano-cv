import { useState } from "react";
import { setCookie } from "@/utils/cookies";
import { SubdomainData } from "@/types/subdomain";
import useFetch from "@/hooks/useFetch";

interface Props {
  slug: string;
  setTheme: (theme: SubdomainData) => void;
}

const CodePage = ({ slug, setTheme }: Props) => {
  const { fetch } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [code, setCode] = useState("");

  const handleOnSubmit = () => {
    fetch({
      body: {
        subdomain: slug,
        code,
      },
      onSuccess: (data) => {
        setCookie("code", code, 48);
        setTheme(data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      <input
        onChange={(e) => setCode(e.target.value)}
        value={code}
        type="text"
        placeholder="Enter code"
      />
      <button type="button" onClick={handleOnSubmit}>
        Submit
      </button>
    </>
  );
};

export default CodePage;
