import "./styles/SearchButton.css"

const SearchButton = ({ onClick }) => {
  return (
    <button type="submit" className="search-button" onClick={onClick}>
      Search for trains
    </button>
  )
}

export default SearchButton
