import Image from "next/image";
import { WordsFiltering } from "./words-filtering";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col container mx-auto gap-4">
      <WordsFiltering />
    </main>
  );
}
