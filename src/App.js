import { useEffect } from "react";
import { chat } from "./api";
import "./elements/index";
import "./globals.css"

function App() {
  useEffect(() => {
    chat.setToken(process.env.REACT_APP_API_KEY);
  }, []);

  return (
    <div>
      <index-page></index-page>
    </div>
  );
}

export default App;
