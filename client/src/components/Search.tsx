import { useState, ChangeEvent } from "react";

type Props = {
  searchRes: (query: string) => void;
};

const Search = (props: Props) => {
  const searchRes = props.searchRes;
  // similar to Gallery
  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const handleClick = () => {
    searchRes(search);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Type in Recipe Name"
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
