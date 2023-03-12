import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-black">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-3xl">
            AbdoTranslate
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-6">
          <Button
            variant="default"
            onClick={() => {
              window.open(
                "https://github.com/ChrisAbdo/AbdoTranslate",
                "_blank"
              );
            }}
          >
            <Github />
            &nbsp;Star on GitHub
          </Button>
        </div>
      </nav>
    </header>
  );
}
