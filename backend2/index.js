const express =require('express');

const app = express();
const cors= require('cors');
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Load balancer mapping
const loadBalancers = [
    { threshold: 2, url: "http://load-balancer-amrut-1189107151.ap-south-1.elb.amazonaws.com" },
    { threshold: 5, url: "http://loadbalancer-1-1768123365.ap-south-1.elb.amazonaws.com" },
    { threshold: Infinity, url: "http://lb3.example.com" }
];

app.get('/', (req, res) => {
    res.send("I am live");
});

app.post('/get-load-balancer', (req, res) => {

    
    // Find appropriate load balancer
    const selectedLB = loadBalancers.find(lb => req.body.users <= lb.threshold);
    console.log(selectedLB)
    return res.json({
        url: selectedLB.url,
        users: req.body.users
    });

});

app.listen(5000, () => {
    console.log("I am listening at Port 5000");
});
