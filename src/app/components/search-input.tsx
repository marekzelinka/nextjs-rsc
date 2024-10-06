"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Spinner } from "./spinner";

export function SearchInput({ search }: { search?: string }) {
  const { push } = useRouter();

  const [isSearching, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((search: string) => {
    startTransition(() => {
      if (search) {
        push(`/?search=${search}`);
      } else {
        push("/");
      }
    });
  }, 500);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {isSearching ? (
          <Spinner className="size-5 animate-spin text-gray-400" />
        ) : (
          <MagnifyingGlassIcon className="size-5 text-gray-400" />
        )}
      </div>
      <input
        type="search"
        name="search"
        id="search"
        defaultValue={search}
        onChange={(event) => handleSearch(event.target.value)}
        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        placeholder="Search"
        aria-label="Search users"
      />
    </div>
  );
}
