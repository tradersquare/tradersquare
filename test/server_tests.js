const assert = require('assert');
const should = require('should');
const http = require('http');

describe('Server testing', () => {
  describe('1 to 1', () => {
    it('true should be true', () => {
      assert.equal(true, true);
    });
  });

  describe('Server up and running', () => {
    it('Should be a 200 code', (done) => {
      http.get('http://localhost:3000', (res) => {
        assert.equal(200, res.statusCode);
        done();
      });
    });
    it('Should be a 200 code from getTwitterData', (done) => {
      http.get('http://localhost:3000/getTwitterData/yahoo', (res) => {
        assert.equal(200, res.statusCode);
        done();
      })
    })
  });
});
