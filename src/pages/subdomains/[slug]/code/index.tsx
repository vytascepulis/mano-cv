import { useState } from "react";
import { SubdomainData } from "@/types/subdomain";
import useFetch from "@/hooks/useFetch";
import { setCookie } from "@/utils/cookies";

interface Props {
  setTheme: (theme: SubdomainData) => void;
}

const CodePage = ({ setTheme }: Props) => {
  const { fetch } = useFetch<SubdomainData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [code, setCode] = useState("");

  const handleOnSubmit = () => {
    fetch({
      body: {
        code,
      },
      onSuccess: (data) => {
        setTheme(data);
        setCookie("code", code, 48);
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
