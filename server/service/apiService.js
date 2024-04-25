const fetch= require('node-fetch');
const dotenv= require('dotenv');
dotenv.config();
const apiKeyTime = process.env.OPENWEATHER_API_KEY;
const apiKeyIMG = process.env.UNSPLASH_API_KEY;

const apiService={

    async getWeather(city){
        const apiWeatherURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyTime}&lang=pt_br`;
        try{
            const response = await fetch(apiWeatherURL);
            const data=await response.json();
            return (data);
        }catch (error){
            throw new Error('erro ao obter dados climaticos');
        }
    },
    async getImage(city){
        const apiImageURL= `https://api.unsplash.com/photos/random?query=${city}&client_id=${apiKeyIMG}`;
        try{
            const response=await fetch(apiImageURL);
            const data=await response.json();
            return (data);
        }catch (error){
            throw new Error('erro ao obter a imagem do local')
        }
    }
};

module.exports= apiService;