var should = require("should");

describe('Array', function(){
	describe('#indexOf()', function(){
		it('should return -1 when the value is not persists', function(){
			[1,2,3].indexOf(5).should.equal(-1);
                        [1,2,3].indexOf(0).should.equal(-1);
		});
	});
});

var User = function(nombre){
    this.nombre = nombre;
    
    this.save = function(f){
        f();
        return true;
    };
};

describe('User', function(){
  describe('#save()', function(){
    it('should save without error', function(done){
      var user = new User('Luna');
      user.save(function(err){
        if (err) throw err;
        done();
      });
    })
  })
})

var Connection = function(){
    this.users = [];
    
    this.clear = function(f){
        this.users = [];
        f();
    };
    
    this.save = function(users, f){
        this.users = users;
        f();
    };
    
    this.find = function(f){
        f(false, this.users);
    };
    
    return this;
};

describe('Connection', function(){
  var db = new Connection
    , tobi = new User('tobi')
    , loki = new User('loki')
    , jane = new User('jane');

  beforeEach(function(done){
    db.clear(function(err){
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  })

  describe('#find()', function(){
    it('respond with matching records', function(done){
      db.find(function(err, res){
        if (err) return done(err);
        res.should.have.length(3);
        done();
      })
    })
  })
})