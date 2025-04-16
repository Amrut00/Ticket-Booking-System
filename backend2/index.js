const express =require('express');

const app = express();
const cors= require('cors');
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Load balancer mapping
const loadBalancers = [
    { threshold: 2, url: "http://loadbalancer-1-1975732822.ap-south-1.elb.amazonaws.com" },
    { threshold: 5, url: "http://loadbalancer-2-970733594.ap-south-1.elb.amazonaws.com" },
    { threshold: Infinity, url: "http://loadbalancer-1-1975732822.ap-south-1.elb.amazonaws.com" }
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
