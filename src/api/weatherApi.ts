import axios from 'axios';

async function getUviData() {
    try {
        // Make the API request using Axios
        const response = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
            params: {
                lat: '0.7893',
                lon: '113.9213',
                appid: '947ab204f923e1895bf76a4f07e070b6'
            }
        });
        console.log({response})
        return response.data
       
    } catch (error) {
        console.error('Error fetching temprature data:', error);
        return null; // Handle the error as needed
    }
}

export default getUviData;

