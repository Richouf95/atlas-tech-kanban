import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <main>
      <div className="container h-screen flex justify-center items-center relative mx-auto">
        <div className="absolute top-5 right-5">
          <ThemeToggle />
        </div>
        <div>
          <button>Start</button>
        </div>
      </div>
    </main>
  );
}
