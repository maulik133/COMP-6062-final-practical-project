const app = Vue.createApp({
    data() {
        return {
            // User Profile Data
            user: {
                first_name: "",
                last_name: "",
                age: "",
                profile_picture: ""
            },

            // Weather Data
            city: "London",
            province: "Ontario",
            country: "Canada",
            weather: {
                temperature: "",
                wind: "",
                description: "",
                location: "",
                latitude: "",
                longitude: "",
                population: ""
            },

            // Dictionary Data
            word: "",
            dictionary: {
                word: "",
                phonetic: "",
                definition: ""
            }
        };
    },

    methods: {
        // Fetch Random Profile from API
        fetchUser() {
            fetch("http://comp6062.liamstewart.ca/random-user-profile")
                .then(response => response.json())
                .then(data => {
                    this.user.first_name = data.first_name;
                    this.user.last_name = data.last_name;
                    this.user.age = data.age;
                    this.user.profile_picture = data.profile_picture;
                })
                .catch(error => console.error("Error fetching user:", error));
        },

        // Fetch Weather Data
        fetchWeather() {
            fetch(`http://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`)
                .then(response => response.json())
                .then(data => {
                    if (data.temperature) {
                        this.weather.temperature = data.temperature;
                        this.weather.wind = data.wind_speed;
                        this.weather.description = data.weather_description;
                        this.weather.location = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
                        this.weather.latitude = data.location.latitude;
                        this.weather.longitude = data.location.longitude;
                        this.weather.population = data.location.population;
                    } else {
                        alert("Weather data not available. Check every field input.");
                    }
                })
                .catch(error => console.error("Error fetching weather:", error));
        },

        // Use Dictionary Definition
        fetchDefinition() {
            if (!this.word.trim()) {
                alert("Please enter a word.");
                return;
            }

            fetch(`https://comp6062.liamstewart.ca/define?word=${this.word}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        this.dictionary.word = data[0].word;
                        this.dictionary.phonetic = data[0].phonetic;
                        this.dictionary.definition = data[0].definition;
                    } else {
                        alert("Word definition not available. Try another word.");
                    }
                })
                .catch(error => console.error("Error fetching definition:", error));
        }
    },

    mounted() {
        this.fetchUser();  // Only load user on startup
    }
});

app.mount("#app");
