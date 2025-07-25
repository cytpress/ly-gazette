import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSearchFilter } from "@/context/SearchFilterContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchOverlay } from "@/components/SearchOverlay";
import { useWindowSize } from "@/hooks/useWindowSize";
import { BREAKPOINT_MD } from "@/constants/breakpoints";
import lyzer from "@/assets/lyzer.svg";
import lyzerNoText from "@/assets/lyzer-no-text.svg";

export function SiteHeader() {
  const [searchIsOpen, setIsSearchOpen] = useState(false);
  const currentWindowSize = useWindowSize();

  const {
    searchInputValue,
    setSearchInputValue,
    clearFilterAndSearchTerm,
    handleSubmitSearch,
  } = useSearchFilter();

  function handleSearchInputValueChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearchInputValue(event.target.value);
  }

  function handleLogoCLick() {
    clearFilterAndSearchTerm();
  }

  return (
    <header className="sticky top-0 border-b border-neutral-300 bg-white z-40 px-4">
      <div className="container max-w-7xl mx-auto flex justify-between items-center py-4">
        <Link onClick={handleLogoCLick} to="/" className="px-2">
          {currentWindowSize > BREAKPOINT_MD && (
            <img src={lyzer} alt="placeholder" className="h-9 w-auto" />
          )}
          {currentWindowSize < BREAKPOINT_MD && (
            <img src={lyzerNoText} alt="placeholder" className="h-9 w-auto" />
          )}
        </Link>

        <div className="flex items-center space-x-6">
          <form
            onSubmit={handleSubmitSearch}
            className="relative hidden md:block"
          >
            <input
              value={searchInputValue}
              onChange={handleSearchInputValueChange}
              type="search"
              placeholder="搜尋..."
              className="px-3 py-2 w-24 pr-10 rounded-2xl text-sm text-neutral-900 border-2 border-neutral-300 focus:outline-none focus:w-60 focus:border-neutral-500 transition-all duration-300 ease-in-out "
            />
            <button
              type="submit"
              className="
                absolute inset-y-0 right-0
                flex items-center
                px-3
                text-neutral-400
                focus:outline-none
              "
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </form>

          <div className="flex flex-row ">
            <button
              type="button"
              className="md:hidden flex items-center px-3 text-neutral-700 focus:outline-none"
              onClick={() => {
                setIsSearchOpen(true);
              }}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <nav>
              <ul className="flex items-center">
                <li>
                  <Link
                    to="/bookmarks"
                    className="px-2 py-2 font-medium text-neutral-700 hover:text-neutral-900 flex items-center"
                  >
                    我的收藏
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="px-2 py-2 font-medium text-neutral-700 hover:text-neutral-900 flex items-center"
                  >
                    關於本站
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <SearchOverlay
        searchIsOpen={searchIsOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    </header>
  );
}
