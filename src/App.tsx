import "@/assets/scss/index.scss";
import { Amount } from "@/components";

function App() {
  return (
    <>
      <Amount amount={10000} currency="KRW" symbol />
    </>
  );
}

export default App;
