import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <main>
      <div className="container h-screen flex justify-center items-center relative mx-auto">
        <div className="absolute top-5 right-5">
          <Link href={'/signin'}><button>Signin</button></Link>
          <ThemeToggle />
        </div>
        <div>
          <Link href={"/dashboard"}>
            <button>Start</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
