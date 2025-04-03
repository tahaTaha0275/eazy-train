export function SearchForm() {
    return (
      <div className={"form-container"}>
        <div className={"inputGroup"}>
          <input type="text" placeholder="From" defaultValue="Riyadh, Saudi Arabia" className={"input"} />
          <input type="text" placeholder="To" defaultValue="Dammam, Saudi Arabia" className={"input"} />
        </div>
        <button className={"searchButton"}>Search for trains</button>
      </div>
    )
  }
  