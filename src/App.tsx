import { XMLParser } from "fast-xml-parser";
import { useEffect } from "react";
import "./App.css";
import xmlData from "./assets/test.xml";

const parser = new XMLParser({
  ignoreAttributes: false,
});

async function createFile(url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = {
    type: "text/xml",
  };
  return new File([data], "test.xml", metadata);
}

function App() {
  useEffect(() => {
    async function loadFile() {
      const file = await createFile(xmlData);
      const text = await file.text();
      const parsed = parser.parse(text);

      console.log(parsed);
    }
    loadFile();
  });
  return (
    <>
      <div>moin</div>
    </>
  );
}

export default App;
