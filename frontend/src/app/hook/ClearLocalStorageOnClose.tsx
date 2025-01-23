import { useEffect } from "react";

const useClearLocalStorageOnClose = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useClearLocalStorageOnClose;