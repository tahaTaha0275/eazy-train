import "./styles/SearchInput.css"

const SearchInput = ({ placeholder, value, onChange, required = true }) => {
  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="search-input"
      />
    </div>
  )
}

export default SearchInput
