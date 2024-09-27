import { TiptapExample1 } from "./tip-tap-example-1.tsx";
import { TiptapExample2 } from "./tip-tap-example-2.tsx";

function App() {
  return (
    <div className="min-h-screen">
      <h1 className="underline">Autocomplete input example 1</h1>

      <TiptapExample1 />

      <h1 className="underline">Autocomplete input example 2</h1>

      <TiptapExample2 />
    </div>
  );
}

export default App;
