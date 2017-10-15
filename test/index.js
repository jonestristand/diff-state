var should = require('chai').should(),
    expect = require('chai').expect;
    diffState = require('../index');

describe('#diffState', function() {
  describe('basic types', function() {
    it('compares number types', function() {
      diffState({a:12.1}, {a:10.1}).should.deep.equal({a:12.1});
    });

    it('compares string types', function() {
      diffState({a:'def'}, {a:'abc'}).should.deep.equal({a:'def'});
    });

    it('compares boolean types', function() {
      diffState({a:true}, {a:false}).should.deep.equal({a:true});
    });

    it('compares symbol types', function() {
      var symA = Symbol('a');
      var symA2 = Symbol('a');
      var symB = Symbol('b');

      diffState({a:symA}, {a:symB}).should.deep.equal({a:symA});
      diffState({a:symA}, {a:symA2}).should.deep.equal({a:symA});
    });

    it('compares null types properly', function() {
      diffState({a:12}, {a:null}).should.deep.equal({a:12});
    });

    it('compares undefined types properly', function() {
      diffState({a:12}, {a:undefined}).should.deep.equal({a:12});
    });
  });

  describe('array types', function() {
    it('compares two identical arrays', function() {
      expect(diffState({a:[1,2,3]}, {a:[1,2,3]})).to.be.undefined;
    });
    it('compares two different arrays of the same length', function() {
      diffState({a:['a','b','c']}, {a:['4','5','6']}).should.deep.equal({a:['a','b','c']});
    });
    it('compares two different arrays with longer array in new state', function() {
      diffState({a:['a','b','c','d']}, {a:[4,5,6]}).should.deep.equal({a:['a','b','c','d']});
    });
    it('compares two different arrays with longer array in old state', function() {
      diffState({a:['a','b','c']}, {a:[4,5,6,7]}).should.deep.equal({a:['a','b','c']});
    });
    it('compares two identical nested arrays', function() {
      expect(diffState({a:[1,2,[3,4,5]]}, {a:[1,2,[3,4,5]]})).to.be.undefined;
    });
    it('compares two different nested arrays', function() {
      diffState({a:[1,2,[5,6,7]]}, {a:[1,2,[3,4,5]]}).should.deep.equal({a:[1,2,[5,6,7]]});
    });
    it('compares two identical arrays containing objects', function() {
      expect(diffState({a:[{a:1},{b:'2'},{c:false}]}, {a:[{a:1},{b:'2'},{c:false}]})).to.be.undefined;
    });
    it('compares two arrays of same length containing different objects', function() {
      diffState({a:[{a:1},{b:'2'},{c:false}]}, {a:[{a:1},{b:'2'},{c:true}]}).should.deep.equal({a:[{a:1},{b:'2'},{c:false}]});
    });
    it('compares two arrays of different lengths containing objects, with longer array in new state', function() {
      diffState({a:[{a:1},{b:'2'},{c:false}]}, {a:[{a:1},{b:'2'}]}).should.deep.equal({a:[{a:1},{b:'2'},{c:false}]});
    });
    it('compares two arrays of different lengths containing objects, with longer array in old state', function() {
      diffState({a:[{a:1},{b:'2'},{c:false}]}, {a:[{a:1},{b:'2'},{c:true},{d:Symbol('d')}]}).should.deep.equal({a:[{a:1},{b:'2'},{c:false}]});
    });
    it('compares an array of values to an array with objects, with values in old state', function() {
      diffState({a:[{a:1},{b:'2'},{c:false}]}, {a:[1,2,3]}).should.deep.equal({a:[{a:1},{b:'2'},{c:false}]});
    });
    it('compares an array of values to an array with objects, with values in new state', function() {
      diffState({a:[1,2,3]}, {a:[{a:1},{b:'2'},{c:false}]}).should.deep.equal({a:[1,2,3]});
    });
  });

  describe('missing values', function() {
    it('handles a missing value in the old state', function() {
      diffState({a:12, b:23}, {a:12}).should.deep.equal({b:23});
    });

    it('handles a missing value in the new state', function() {
      expect(diffState({a:12}, {a:12, b:23})).to.be.undefined;
    });
  });

  describe('nested types', function() {
    it('compares a nested type with the same structure', function() {
      diffState({a:12, b:{c:"test", d:100}}, {a:12, b:{c:"test", d:101}}).should.deep.equal({b:{d:100}});
    });
    it('compares a nested type and a top-level type change', function() {
      diffState({a:13, b:{c:"test", d:100}}, {a:12, b:{c:"test", d:101}}).should.deep.equal({a:13, b:{d:100}});
    });
    it('compares a nested type that is a value type in the new state', function() {
      diffState({a:13, b:12}, {a:12, b:{c:"test", d:101}}).should.deep.equal({a:13, b:12});
    });
    it('compares a nested type that is a value type in the old state', function() {
      diffState({a:12, b:{c: 100}}, {a:12, b:13}).should.deep.equal({b:{c:100}});
    });
    it('compares a nested type that has a different structure', function() {
      diffState({a:12, b:{c: 100, d:false}}, {a:12, b:{e:"test", f:Symbol('a')}}).should.deep.equal({b:{c: 100, d:false}});
    });
  });
});