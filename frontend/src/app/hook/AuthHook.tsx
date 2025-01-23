import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthFetch = () => {
  const router = useRouter();

  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        console.log(await originalFetch(...args))
      const response = await originalFetch(...args);

      
      if (response.status === 401) {
        try {
          const data = await response.json();
          if (data.message === "Invalid token") {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            router.push("/");
          }
        } catch (error) {
          console.error("Failed to parse response JSON", error);
        }
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [router]);
};

export default useAuthFetch;