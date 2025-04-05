document.addEventListener("DOMContentLoaded", function () {
    const fallbackData = {
        "2023": {
            "android": 8.45442536327609,
            "c#": 10.8102157639806,
            "c++": 6.80317040951123,
            "flutter": 6.05460149713783,
            "html": 0,
            "java": 10.1717305151915,
            "javascript": 12.8797886393659,
            "python": 24.4385733157199,
            "reactjs": 8.30030823425804,
            "typescript": 6.3188022897402
        },
        "2024": {
            "android": 8.37591646300822,
            "c#": 10.397689402355,
            "c++": 7.3094867807154,
            "flutter": 6.0875361030882,
            "html": 5.42101755165519,
            "java": 9.57564985558765,
            "javascript": 13.263719173517,
            "python": 25.1055321039769,
            "reactjs": 8.70917573872473,
            "typescript": 5.7542768273717
        },
        "2025": {
            "android": 8.61179636689841,
            "c#": 10.1368019735367,
            "c++": 7.5577483740749,
            "flutter": 5.83090379008746,
            "html": 5.4272258353891,
            "java": 10.8320251177394,
            "javascript": 13.321372505046,
            "python": 24.6243552366001,
            "reactjs": 7.82686701054048,
            "typescript": 5.83090379008746
        }
    };

    fetch("https://ayushdhp.onrender.com/data")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderChart(data);
        })
        .catch(error => {
            console.warn("Using fallback data due to error:", error);
            renderChart(fallbackData);
        });

    function renderChart(data) {
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
    }

    function getRandomColor() {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    }
});
