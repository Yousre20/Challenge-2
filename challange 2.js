document.addEventListener("DOMContentLoaded", () => {
    const citySelector = document.getElementById("citySelector");
    const prayerTimesList = document.getElementById("prayerTimes");

    // Function to fetch prayer times from Aladhan API
    async function fetchPrayerTimes(city) {
        try {
            const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity`, {
                params: {
                    city: city,
                    country: '',  // Optionally specify country
                    method: 2     // You can change the method if needed
                }
            });
            const timings = response.data.data.timings;

            // Display the prayer times
            prayerTimesList.innerHTML = `
                <li>Fajr: ${timings.Fajr}</li>
                <li>Dhuhr: ${timings.Dhuhr}</li>
                <li>Asr: ${timings.Asr}</li>
                <li>Maghrib: ${timings.Maghrib}</li>
                <li>Isha: ${timings.Isha}</li>
                <li>Sunrise: ${timings.Sunrise}</li>
            `;
        } catch (error) {
            console.error('Error fetching prayer times:', error);
        }
    }

    // Fetch prayer times when the page loads
    fetchPrayerTimes(citySelector.value);

    // Update prayer times when the city is changed
    citySelector.addEventListener("change", (event) => {
        fetchPrayerTimes(event.target.value);
    });
});