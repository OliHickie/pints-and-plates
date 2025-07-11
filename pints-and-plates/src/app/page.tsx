import Image from "next/image";

export default function Home() {
  return (
    <div className="grid text-red-400 grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold font-[family-name:var(--font-oswald)]">Pints & Plates</h1>
      <p className="font-[family-name:var(--font-josefin-sans)]">
        Discover the best pairings of craft beers and delicious dishes. Pints & Plates helps you explore, match, and enjoy food and drink combinations curated for every taste.
      </p>
    </div>
  );
}
