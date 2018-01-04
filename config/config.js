var config = {
	secretkey: "ZbSPzD6e",
	host: "http://localhost:8000/",
	mongoserver: "mongodb://tuser:user123@ds123926.mlab.com:23926/schooldb",
	basepath: '/home/ubuntu/workspace/server/',
}
config.pathstatic = config.basepath + "public/",
module.exports = config;
