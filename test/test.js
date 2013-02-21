var should = require("should")
,   quejas = require("../routes/queja")
,   restify = require("restify")
,   client = restify.createJsonClient({
        version: '*',
        url: 'http://isee.tiatere.es:8080'
    });
 

describe('Quejas', function(){
    var quejas, response;
    
    before(function(done){
        client.get('/quejas?lat=41.115573&lon=1.267033', function(err, req, res, data) {
            response = res;
            quejas = data;
            done();
        });
    })
    describe('Obtener quejas con coordeandas', function(){
        it('Should get a 200 response', function() {
           response.should.have.status(200); 
        });
        it('Queja should has title', function() {
           quejas[0].should.have.property('title');
        });
    });
});
