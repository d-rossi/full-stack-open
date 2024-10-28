import { useState } from "react"

const DetailedDisplay = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
            </ul>
            <img src={country.flags.png} />
        </div>
    )
}

const ListDisplay = ({countries}) => {
    const [showDetailedView, setShowDetailedView] = useState(false)
    const [country, setCountry] = useState(null)

    const handleShow = (country) => {
        setCountry({...country})
        setShowDetailedView(true)
    }


    return (
        <div>
            {countries.map((country, i) => <p key={i}>{country.name.common} <button onClick={() => handleShow(country)}>show</button></p>)}
            {showDetailedView ? <DetailedDisplay country={country} /> : null}
        </div>
    )
}

const DisplayCountries = ({countries}) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else {
        return (
            <div>
                {countries.length === 1 ? <DetailedDisplay country={countries[0]} /> : <ListDisplay countries={countries} />}
            </div>
        )
    }

}

export default DisplayCountries