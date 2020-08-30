import { React } from "../deps/react.ts";

const styles = {
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "192px",
    height: "192px",
  },
};

const App = (props: any) => {
  let [ loading, setLoading ] = React.useState(true);

  React.useEffect(() => {
    const timerId = setTimeout(() => setLoading(false), 1000);

    return () => {
      //cleanup
      clearTimeout(timerId);
    }
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
