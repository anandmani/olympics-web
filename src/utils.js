export const parseResponse = (response) => {
    console.log("parse response", response)
    if (response.status >= 200 && response.status < 300) {
        return response.json().then((body) => {
            return body
        })
    } else {
        return response.text().then((body) => {
            let error = new Error(body)
            throw error
        })
    }
}

export const url = 'http://localhost:3000';

/* 
    Map used in react-simple-maps use United Nations name for Countries.
    Countries in Regions_data table in the oracle databse used a different convention 
    This is a mapping from UN -> oracle for names that differ
*/

export const countryMapping = {
    "Bahamas": "Bahamas, The",
    "Bosnia and Herz.": "Bosnia and Herzegovina",
    "Brunei": "Brunei Darussalam",
    "Central African Rep.": "Central African Republic",
    "Côte d'Ivoire": "Cote d'Ivoire",
    "Dem. Rep. Congo": "Congo, Dem. Rep.",
    "Congo": "Congo, Rep.",
    "Curaçao": "Curacao",
    "N. Cyprus": "Cyprus",
    "Czech Rep.": "Czech Republic",
    "Dominican Rep.": "Dominican Republic",
    "Faeroe Is.": "Faroe Islands",
    "United Kingdom": "UK",
    "Eq. Guinea": "Equatorial Guinea",
    "Hong Kong": "Hong Kong SAR, China",
    "Kyrgyzstan": "Kyrgyz Republic",
    "Korea": "South Korea",
    "Lao PDR": "Laos",
    "Saint Lucia": "St. Lucia",
    "St-Martin": "St. Martin (French part)",
    "Macedonia": "Macedonia, FYR",
    "Dem. Rep. Korea": "North Korea",
    "Fr. Polynesia": "French Polynesia",
    "S. Sudan": "South Sudan",
    "Solomon Is.": "Solomon Islands",
    "São Tomé and Principe": "Sao Tome and Principe",
    "Sint Maarten": "St. Martin (French part)",
    "United States": "USA",
    "St. Vin. and Gren.": "St. Vincent and the Grenadines",
    "Venezuela": "Venezuela, RB",
}
