const app = require('./app');
const PORT = 80;

app.listen(PORT, (err) => {
    if (!err) {
        console.log("Server running on port ", PORT);
    }
    else {
        console.log("Error occured, server can't start: ", err);
    }
})