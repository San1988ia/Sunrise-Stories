// import { FormEvent, useState } from "react";

// interface SearchBarProps {
//   onSearch: (query: string) => void;
//   placeholder?: string;
// }

// const SearchBar = ({
//   onSearch,
//   placeholder = "Sök efter en bok...",
// }: SearchBarProps) => {
//   const [input, setInput] = useState("");

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const trimmed = input.trim();
//     if (trimmed.length > 0) {
//       onSearch(trimmed);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-bar">
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder={placeholder}
//       />
//       <button type="submit">Sök</button>
//     </form>
//   );
// };

// export default SearchBar;
