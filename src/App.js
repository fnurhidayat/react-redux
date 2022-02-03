import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import APOD from "./APOD";
import { getAPOD, getPreviousAPOD, selectAPOD } from "./stores/apodSlice";

function App() {
  const dispatch = useDispatch();
  const { value, status } = useSelector(selectAPOD);

  useEffect(() => {
    dispatch(getAPOD());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <APOD />
        {!!value && (
          <div className="App-container">
            <img src={value?.url} alt={value?.title} />
            <h1>{value?.title}</h1>
            <h6>{value?.date}</h6>
            <p>{value?.explanation}</p>

            <button onClick={() => dispatch(getPreviousAPOD(value?.date))}>
              Previous
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
