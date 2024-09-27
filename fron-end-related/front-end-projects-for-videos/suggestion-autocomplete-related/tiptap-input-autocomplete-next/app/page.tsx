import { TiptapExample1 } from "@/components/tip-tap-example-1";
import { TiptapExample2 } from "@/components/tip-tap-example-2";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col space-x-2 space-y-2">
      <h1 className="underline">Autocomplete input example 1</h1>

      <TiptapExample1 />

      <h1 className="underline">Autocomplete input example 2</h1>

      <TiptapExample2 />
    </main>
  );
}
