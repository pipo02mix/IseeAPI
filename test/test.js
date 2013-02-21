var should = require("should")
,   quejas = require("../routes/queja")
,   restify = require("restify")
,   client = restify.createJsonClient({
        version: '*',
        url: 'http://127.0.0.1:8080'
    });
 

describe('Quejas', function(){
    var quejas, response;
    
    before(function(done){
        client.get('/quejas/41.115573/1.267033', function(err, req, res, data) {
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
