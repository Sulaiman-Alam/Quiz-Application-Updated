const express = require("express");
const path = require("path");
const port = 3500;
const server = express();

server.use(express.static('.'));

let links = [
    { url: "/", filepath: "Home/home.html" },
    { url: "/home.css", filepath: "Home/home.css" },
    { url: "/home.js", filepath: "Home/home.js" },
    { url: "/Home/home.html", filepath: "Home/home.html" },
    { url: "/Home/home.css", filepath: "Home/home.css" },
    { url: "/Home/home.js", filepath: "Home/home.js" },
    { url: "/Images/james_holzhauer.jpg", filepath: "Images/james_holzhauer.jpg" },
    { url: "/Images/ken_jennings.jpg", filepath: "Images/ken_jennings.jpg" },
    { url: "/Images/brad_rutter.jpg", filepath: "Images/brad_rutter.jpg" },
    { url: "/Game/game.html", filepath: "Game/game.html" },
    { url: "/Game/game.css", filepath: "Game/game.css" },
    { url: "/Game/game.js", filepath: "Game/game.js" },
    // { url: "/Home/Game/game.html", filepath: "Home/Game/game.html" },
    // { url: "/Home/Game/game.css", filepath: "Home/Game/game.css" },
    // { url: "/Home/Game/game.js", filepath: "Home/Game/game.js" },
    { url: "/app.css", filepath: "app.css" },
    // { url: "/Home/Results/results.html", filepath: "Home/Results/results.html" },
    // { url: "/Home/Results/results.css", filepath: "HomeResults/results.css" },
    // { url: "/Home/Results/results.js", filepath: "Home/Results/results.js" },
    { url: "/Results/results.html", filepath: "Results/results.html" },
    // { url: "/Media/Button Sound Effect.mp3", filepath: "Media/Button Sound Effect.mp3" },
    { url: "/Results/results.css", filepath: "Results/results.css" },
    { url: "/Results/results.js", filepath: "Results/results.js" }
];

for (let i = 0; i < links.length; i++) {
    server.get(links[i].url, (req, res) => {
        res.sendFile(path.join(__dirname, links[i].filepath));
    })
}

server.listen(port, () => {
    console.log(`Express listetning on port ${port}`);
})