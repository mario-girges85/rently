module.exports.test = (req, res) => {
    try{
        
        res.status(201).send("Hello, i am running from test route");
    }
    catch (error){
        res.status(500).send("can't run successfully" , {error })
    }
};