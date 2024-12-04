const initialState = {
    filterString: ''
}

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FILTER_STRING':
            return {...state, filterString: action.payload.filterString}
        default:
            return state
    }
}

export const setFilterStringAction = (filterString) => {
    return {
        type: 'SET_FILTER_STRING',
        payload: { filterString }
    }
}

export default filterReducer