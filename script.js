document.addEventListener("DOMContentLoaded", function () {
    fetch("https://ayushdhp.onrender.com/data")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || typeof data !== 'object') {
                throw new Error("Invalid data structure");
            }

            const years = Object.keys(data);
            const tags = Object.keys(data[years[0]]);

            const datasets = tags.map(tag => ({
                label: tag,
                data: years.map(year => data[year][tag] || 0),
                borderColor: getRandomColor(),
                fill: false
            }));

            const ctx = document.getElementById("lineChart").getContext("2d");

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: years,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Top 10 Topics Over the Years" }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: "Percentage (%)" }
                        },
                        x: {
                            title: { display: true, text: "Year" }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.body.innerHTML += "<p style='color:red;'>Error loading data. Please try again later.</p>";
        });

    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    }
});
