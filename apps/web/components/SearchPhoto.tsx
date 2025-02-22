"use client";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
SearchIcon;

export const SearchPhoto = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const q = searchParams.get("searchKey")?.toString();
  //   const [search, setSearch] = useState(`${q || ""}`);
  const router = useRouter();
  const [secondarySearchValue, setSecondarySearchValue] = useState(
    `${q || ""}`
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const { replace } = useRouter();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("searchKey", query);
      params.set("page", "1");
    } else {
      params.delete("searchKey");
    }
    setSearch(secondarySearchValue);
  };

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      handleSearch("");
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search..."
        value={secondarySearchValue}
        onChange={(e) => {
          setSecondarySearchValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            inputRef?.current?.blur();
          }
        }}
        ref={inputRef}
      />
      <Button
        onClick={() => {
            handleSearch(secondarySearchValue);
        }}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchPhoto;
