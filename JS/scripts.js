    // 0cad1c087c0365c42d4c56361b4a44d5
    //https://api.unsplash.com/photos/?query=london&client_id=j_UFU0gjmOpy_TrmN27DBa4kZt-rieTvp3ROjQzoVyY
    // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=0cad1c087c0365c42d4c56361b4a44d5
    (function(){
        'use strict'

        document.addEventListener('DOMContentLoaded',function(){
        //VARIAVEIS E CABEÇALHO
        const apiKeyTime= "0cad1c087c0365c42d4c56361b4a44d5";
        const apiKeyIMG= "j_UFU0gjmOpy_TrmN27DBa4kZt-rieTvp3ROjQzoVyY";
        const weatherContainer=document.querySelector('#weather-data')
        const cityInput= document.querySelector("#city-input");
        const searchBtn= document.querySelector("#search");
        const cityElement= document.querySelector("#city");
        const tempElement=document.querySelector("#temperature span");
        const descElement=document.querySelector("#description");
        const weatherIconElement=document.querySelector("#weather-icon");
        const countryElement=document.querySelector("#country");
        const humidityElement=document.querySelector("#humidity span");
        const windElemement=document.querySelector("#wind span");

        //EVENTOS
        searchBtn.addEventListener('click', handleSearch);
        cityInput.addEventListener("keyup", (e) => {
            if (e.code === "Enter") {
                handleSearch();
            }
        });

        //FUNÇOES
        async function handleSearch() {
            const city = cityInput.value;
            const dataWeather = await getWeatherData(city);
            const dataImage = await getImageData(city);
            atribuitions(dataWeather, dataImage);
        }
        const atribuitions= async(dataWeather, dataImage)=>{
            cityElement.innerText=dataWeather.name;
            tempElement.innerText=parseInt(dataWeather.main.temp);
            descElement.innerText=dataWeather.weather[0].description;
            weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}.png`);
            countryElement.setAttribute("src", `https://flagsapi.com/${dataWeather.sys.country}/flat/64.png`);
            humidityElement.innerText=`${dataWeather.main.humidity}%`;
            windElemement.innerText=`${dataWeather.wind.speed}km/h`;
            weatherContainer.classList.remove("hide");
            document.body.style.backgroundImage = `url('${dataImage.urls.regular}')`;
        }

        const getWeatherData= async(city)=>{
            const apiWeatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyTime}&lang=pt_br`;
            const res= await fetch(apiWeatherURL);
            const data= await res.json();
            console.log(data);
            return data;
        }

        const getImageData= async(city)=>{
            const apiImageURL=`https://api.unsplash.com/photos/random?query=${city}&client_id=${apiKeyIMG}`
            const res=await fetch(apiImageURL);
            const data=await res.json();
            console.log(data);
            return data;
        }

        });
    })();