import { useSelector } from "react-redux";
import { selectAPOD } from "./stores/apodSlice";

function APOD() {
  const { status } = useSelector(selectAPOD);

  return <p>{status}</p>;
}

export default APOD;
