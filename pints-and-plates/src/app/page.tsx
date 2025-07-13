import Image from "next/image";

export default function Home() {
  return (
    <div className="grid text-accent grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/beach-restaurant-evening.jpg"
          alt="Hero background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <h1 className="text-4xl font-bold font-heading">Pints & Plates</h1>
      <p className="font-serif">
        Discover the best pairings of craft beers and delicious dishes. Pints & Plates helps you explore, match, and enjoy food and drink combinations curated for every taste.
      </p>
    </div>
  );
}
