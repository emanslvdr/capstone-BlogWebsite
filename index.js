import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const posts = [];


app.get("/", (req, res) => {
    let postCounter = posts.length;
    let postNumber = postCounter + 1;
    res.render("index.ejs", {
        post: postCounter,
        posts: posts,
    });
})

app.get("/post", (req, res) => {
    res.render("posts.ejs");
})


app.get("/about", (req, res) => {
    res.render("about.ejs");
})

// Create post


app.post("/submit", (req, res) => {
    const postContent = req.body["postList"];
    const id = posts.length + 1;
    posts.push({ uid: Date.now(), content: postContent, id: id });


    res.render("index.ejs", {
        post: `post: ${postContent}`,
        posts: posts,
    });
    console.log(posts);
    console.log(postContent)
})

// Edit post

app.get("/edit/:uid", (req, res) => {
    const postID = req.params.uid;
    const checker = posts.findIndex(post => post.uid == postID);

    const origPost = posts[checker];

    let postCounter = posts.length;
    res.render("postOptions.ejs", {
        post: postCounter,
        posts: posts,
        origPost: origPost,
        postIndex: checker,
    });
})

app.post("/edit/:postIndex", (req, res) => {
    const postIndex = req.params.postIndex;
    const postNewContent = req.body["content"];

    posts[postIndex].content = postNewContent;

    let postCounter = posts.length;
    res.render("index.ejs", {
        post: postCounter,
        posts: posts,
    });
})

// Delete post



app.post("/delete/:uid", (req, res) => {
    const postID = req.params.uid;
    const checker = posts.findIndex(post => post.uid == postID);
    posts.splice(checker, 1);

    let postCounter = posts.length;
    res.render("index.ejs", {
        post: postCounter,
        posts: posts,
    });
})


app.listen(port, () => {
    console.log(`Serve is running on port ${port}`);
});



// app.get("/delete/:uid", (req, res) => {
//     const postID = req.params.uid;
//     const checker = posts.findIndex(post => post.uid == postID);

//     const origPost = posts[checker];

//     let postCounter = posts.length;
//     res.render("delete.ejs", {
//         post: postCounter,
//         posts: posts,
//         origPost: origPost,
//         postIndex: checker,
//     });

// })