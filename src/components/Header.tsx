import { FaSearch } from "react-icons/fa";
export default function Header() {
  return (
    <section>
      <h1 className="header">Welcome To the crypto tracker</h1>
      <form className="form">
        <FaSearch className="search__icon" />
        <input type="text" />
      </form>
    </section>
  );
}
