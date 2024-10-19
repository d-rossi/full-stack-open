const Search = ({text, onChange}) => {
    return (
    <div>
        filter shown with <input value={text} onChange={onChange} />
    </div>
    )
}

export default Search