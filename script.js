document.addEventListener("DOMContentLoaded", function () {
    const checkButton = document.getElementById("checkButton");
    const newsText = document.getElementById("newsText");

    if (checkButton && newsText) {
        checkButton.addEventListener("click", function () {
            let inputText = newsText.value.trim();

            if (inputText === "") {
                alert("Please enter some text!");
                return;
            }

            fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("result").innerText = "Prediction: " + data.prediction;
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("result").innerText = "Error: Could not fetch prediction.";
            });
        });
    }
});
