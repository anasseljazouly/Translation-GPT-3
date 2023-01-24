import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();
  const [target, setTarget] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textInput: textInput, target: target }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Translate your text</h3>
        <form onSubmit={onSubmit}>
          <select name="target" onChange={(e) => setTarget(e.target.value)}>
            <option value="" disabled selected>
              choose your target language
            </option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="arabic">Arabic</option>
            <option value="English">English</option>
          </select>
          <textarea
            name="textInput"
            placeholder="Enter your text to translate"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className={styles.input}
          ></textarea>
          <input type="submit" value="Translate" />
        </form>
        <textarea className={styles.textAreaResult} value={result}></textarea>
      </main>
    </div>
  );
}
