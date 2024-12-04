import { useDispatch } from "react-redux"
import { setFilterStringAction } from "../reducers/filterReducer"

const Filter = () => {
    const dispatcher = useDispatch()
    return (
        <div style={{marginBottom: 10}}>
            Filter: <input onChange={(event) => dispatcher(setFilterStringAction(event.target.value))} />
        </div>
    )
}

export default Filter