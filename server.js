const express = require("express");
const path = require("path");
const port = 3500;
const server = express();
server.use(express.urlencoded({ extended: true })); // So express can understand form bodies (keep for application)
server.use(express.static('public')); // By moving everything into a public folder, we don't need to manually route each file!

let user_list = {
    "x@gmail.com": {
        name: "x",
        password: "12323"
    }
}; // Temporary object to store users

// Can Delete commented code below!

// let links = [
//     { url: "/", filepath: "Home/home.html" },
//     { url: "/home.css", filepath: "Home/home.css" },
//     { url: "/home.js", filepath: "Home/home.js" },
//     { url: "/Home/home.html", filepath: "Home/home.html" },
//     { url: "/Home/home.css", filepath: "Home/home.css" },
//     { url: "/Home/home.js", filepath: "Home/home.js" },
//     { url: "/Images/james_holzhauer.jpg", filepath: "Images/james_holzhauer.jpg" },
//     { url: "/Images/ken_jennings.jpg", filepath: "Images/ken_jennings.jpg" },
//     { url: "/Images/brad_rutter.jpg", filepath: "Images/brad_rutter.jpg" },
//     { url: "/Game/game.html", filepath: "Game/game.html" },
//     { url: "/Game/game.css", filepath: "Game/game.css" },
//     { url: "/Game/game.js", filepath: "Game/game.js" },
//     // { url: "/Home/Game/game.html", filepath: "Home/Game/game.html" },
//     // { url: "/Home/Game/game.css", filepath: "Home/Game/game.css" },
//     // { url: "/Home/Game/game.js", filepath: "Home/Game/game.js" },
//     { url: "/app.css", filepath: "app.css" },
//     // { url: "/Home/Results/results.html", filepath: "Home/Results/results.html" },
//     // { url: "/Home/Results/results.css", filepath: "HomeResults/results.css" },
//     // { url: "/Home/Results/results.js", filepath: "Home/Results/results.js" },
//     { url: "/Results/results.html", filepath: "Results/results.html" },
//     // { url: "/Media/Button Sound Effect.mp3", filepath: "Media/Button Sound Effect.mp3" },
//     { url: "/Results/results.css", filepath: "Results/results.css" },
//     { url: "/Results/results.js", filepath: "Results/results.js" },
//     { url: "/SignIn/signin.css", filepath: "SignIn/signin.css" },
//     { url: "/SignIn/signin.html", filepath: "SignIn/signin.html" },
//     { url: "/SignIn/signin.js", filepath: "SignIn/signin.js" },
//     { url: "/SignUp/signup.css", filepath: "SignUp/signup.css" },
//     { url: "/SignUp/signup.html", filepath: "SignUp/signup.html" },
//     { url: "/SignUp/signup.js", filepath: "SignUp/signup.js" }
// ];

// for (let i = 0; i < links.length; i++) {
//     server.get(links[i].url, (req, res) => {
//         res.sendFile(path.join(__dirname, links[i].filepath));
//     })
// }

server.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Temporary checking if users exist
    if (user_list[email]) {
        if (user_list[email].password !== password) {
            console.log("Invalid Password!");
            res.redirect("/Signin/signin.html");
        } else {
            res.redirect("/Game/game.html");
        }
    }
})

server.post("/signup", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Temporary storage of users into an object of users
    if (user_list[email]) {
        console.log("User already exists");
        res.redirect("/SignIn/signin.html");
    } else {
        user_list[email] = {
            name: name,
            password: password
        }
        res.redirect("/Game/game.html");
    }
})

server.listen(port, () => {
    console.log(`Express listening on port ${port}`);
})