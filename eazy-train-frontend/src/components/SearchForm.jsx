import "../components/styles/SearchForm.css"
export function SearchForm({from,to}) {
    return (
      <div className={"form-container"}>
        <div className={"inputGroup"}>
          <input disabled type="text" placeholder="From" defaultValue={`${from}, Saudi Arabia`} className={"input"} />
          <input disabled type="text" placeholder="To" defaultValue={`${to}, Saudi Arabia`} className={"input"} />
        </div>
        <button className={"searchButton"}>Search for trains</button>
      </div>
    )
  }
  