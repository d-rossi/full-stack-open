import { useDispatch } from "react-redux"
import { setFilterString } from "../reducers/filterReducer"

const Filter = () => {
    const dispatcher = useDispatch()
    return (
        <div style={{marginBottom: 10}}>
            Filter: <input onChange={(event) => dispatcher(setFilterString(event.target.value))} />
        </div>
    )
}

export default Filter