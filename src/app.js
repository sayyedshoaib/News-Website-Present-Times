require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const path = require("path");
const axios = require("axios");
const hbs = require("hbs");
const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Register = require("./models/registers");
const port = process.env.PORT || 5000;


const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.set('view engine', 'hbs');
app.use(cookieParser());
app.use(express.static(static_path))
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "hbs");
app.set("views", templates_path);
app.set("partials", partials_path);

hbs.registerPartials(partials_path);

app.get("/", async (req, res) => {

    try {
        const quotes = await axios.get(`https://type.fit/api/quotes`)
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=d5f1e42da8914822af50690fc887c52e`)
        console.log(quotes)
        res.render('news', { articles: newsAPI.data.articles});
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('news', { articles: false })
        } else if (err.requiest) {
            res.render('news', { articles: false })
            console.log(err.requiest)
        } else {
            res.render('news', { articles: false })
            console.error('Error', err.message)
        }
    }
})
app.get("/news", async (req, res) => {

    try {
        const quotes = await axios.get(`https://type.fit/api/quotes`)
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=d5f1e42da8914822af50690fc887c52e`)
        console.log(quotes)
        res.render('news1', { articles: newsAPI.data.articles});
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('news1', { articles: false })
        } else if (err.requiest) {
            res.render('news1', { articles: false })
            console.log(err.requiest)
        } else {
            res.render('news1', { articles: false })
            console.error('Error', err.message)
        }
    }
})
app.get("/sports", async (req, res) => {

    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=d5f1e42da8914822af50690fc887c52e`)
        res.render('sports', { articles : newsAPI.data.articles});
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('sports', { articles: false })
        } else if (err.requiest) {
            res.render('sports', { articles: false })
            console.log(err.requiest)
        } else {
            res.render('sports', { articles: false })
            console.error('Error', err.message)
        }
    }
})
app.get("/sports1", async (req, res) => {

    try {
        const quotes = await axios.get(`https://type.fit/api/quotes`)
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=d5f1e42da8914822af50690fc887c52e`)
        console.log(quotes)
        res.render('sports1', { articles: newsAPI.data.articles});
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('sports1', { articles: false })
        } else if (err.requiest) {
            res.render('sports1', { articles: false })
            console.log(err.requiest)
        } else {
            res.render('sports1', { articles: false })
            console.error('Error', err.message)
        }
    }
})
// 
// app.get("/weather", async(req,res) =>{
//      requests("http://api.openweathermap.org/data/2.5/weather?q=Nagpur&appid=90cfaca42f13a9f7929868e0a9d1b206")
//      .on("data", (chunk) =>{
//             const objData = JSON.parse(chunk);
//             const arrData = [objData];
//             res.send(arrData);
//         }).on("end" ,(err) =>{
//             if(err) return console.log("connection closed due to",err);
//             console.log("end")
//         });
// })
app.get("/weather", async (req, res) => {
    try {
        const weatherApi = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=nagpur&appid=90cfaca42f13a9f7929868e0a9d1b206&units=metric`)
        res.render('weather', {data: weatherApi.data });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('news', { articles: false })
        } else if (err.requiest) {
            res.render('news', { articles: false })
            console.log(err.requiest)
        } else {
            res.render('news', { articles: false })
            console.error('Error', err.message)
        }
    }
})
app.post("/weather", async (req, res) => {
    cityname = req.body.city;
    try {
        const weatherApi = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=90cfaca42f13a9f7929868e0a9d1b206`)
        res.render('weather', {data: weatherApi.data });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('news', { articles: false })
        } else if (err.requiest) {
            res.render('news', { articles: false })
            console.log(err.requiest)
        } else {
            res.render('news', { articles: false })
            console.error('Error', err.message)
        }
    }
})
app.get("/weather", async (req, res) => {
    try {
        const weatherApi = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=nagpur&appid=90cfaca42f13a9f7929868e0a9d1b206&units=metric`)
        res.render('weather', {data: weatherApi.data });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('weather', { articles: false })
        } else if (err.requiest) {
            res.render('weather', { articles: false })
            console.log(err.requiest)
        } else {
            res.render('weather', { articles: false })
            console.error('Error', err.message)
        }
    }
})
app.post("/weather1", async (req, res) => {
    cityname = req.body.city;
    try {
        const weatherApi = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=90cfaca42f13a9f7929868e0a9d1b206`)
        res.render('weather1', {data: weatherApi.data });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('weather1', { articles: false })
        } else if (err.requiest) {
            res.render('weather1', { articles: false })
            console.log(err.requiest)
        } else {
            res.render('weather1', { articles: false })
            console.error('Error', err.message)
        }
    }
})



app.get("/register", (req, res) => {
    res.render("register");
})
app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/register", async (req, res) => {
    console.log("done 0")
    const password = req.body.password;
    const confirmPassword = req.body.cpassword;
    if (password === confirmPassword) {
        const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            email: req.body.email,
            gender: req.body.gender,
            password: req.body.password,
            confirmPassword: req.body.cpassword
        })
        
        console.log(registerEmployee)
        try {
            const token = await registerEmployee.generateAuthToken();
            console.log("the token part " + token);

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true
                // secure:true
            });
            const registered = await registerEmployee.save();
            console.log("this is" + registered);

            const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=d5f1e42da8914822af50690fc887c52e`)
            res.render('news1', { articles: newsAPI.data.articles });
        } catch (e) {
            console.log("error is " + e);
        }
    } else {
        res.send("Password is not matching");
    }
})
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // console.log("done0");
    const userEmail = await Register.findOne({ email });
    // console.log("done1");
    try {
        
        const token = await userEmail.generateAuthToken();
        console.log("done2");
        const isMatch = bcrypt.compare(password, userEmail.password);
        console.log("done3");
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3000),
            httpOnly: true
        });

        console.log("done4");
        if (isMatch) {
            const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=d5f1e42da8914822af50690fc887c52e`)
            res.render('news1', { articles: newsAPI.data.articles });
            res.status(201).render("news1");

        } else {
            res.send("invalid Password Details");
        }

    } catch (e) {
        res.status(400).send("Invalid Email");
    }
})
app.get("/logout", auth, async (req, res) => {
    try {
        // single screen logout
        // req.user.token = req.user.token.filter((currentElement) =>{
        //     return currentElement.token !== req.token
        // })

        // logout from all user
        req.user.tokens = [];
        res.clearCookie("jwt");

        await req.user.save();
        res.render("news");
    } catch (error) {
        res.status(500).send(error);
    }
})
app.listen(port, () => {
    console.log(`connection is set up at port ${port}`);
})
