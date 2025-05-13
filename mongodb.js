const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://tanishsharma4644:tanish123@cluster0.n7yenb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//mongoose.connect("mongodb://localhost:27017")
mongoose.connect("mongodb+srv://tanishsharma4644:tanish123@cluster0.gl03m5m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

.then( ()=> console.log('MongoDB connected'))
.catch( ()=> console.log('MongoDB failed to connect'))

const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const Users = new mongoose.model('Users', loginSchema);

module.exports = Users;