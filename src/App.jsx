import { useState } from "react";
import Form from "./components/Form";

function App() {
  const [valoreAttualeDelloStato, funzionePerAggiornareLoStato] = useState(0);
  return (
    <>
      <Form />
    </>
  );
}

export default App;
