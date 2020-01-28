import { useEffect } from "react";

export default function useKeyboard(cb) {
  function handleKeyPress(e) {
    e.preventDefault();
    cb(e.key);
  }
  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);
}
