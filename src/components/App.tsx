import React, { useEffect, useState } from "../deps/react.ts";

const styles = {
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "192px",
    height: "192px",
  },
};

export interface AppProps {}

const App = ({}: AppProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Start loading...");
    const timerId = setTimeout(() => {
      setLoading(false);
      console.log("Finished loading");
    }, 1000);

    return () => {
      //cleanup
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="container">
      <p>
        <img src="assets/img/deno-logo.png" style={styles.logo} />
        <img src="assets/img/react-logo192.png" style={styles.logo} />
      </p>
      <pre>Loading ...{(loading) ? "" : " OK!"}</pre>
      <p>Open up App.tsx to start working on your app!</p>
    </div>
  );
};

export default App;
