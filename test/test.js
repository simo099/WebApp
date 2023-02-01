import chai from 'chai';
const expect = chai.expect;
import {isValid} from "../src/validator.js";

describe('validation', () => {
  var req = {body: undefined}
  it('body is undefined', (done) =>{
    expect (isValid(req)).is.false
    done();
  })
  it('everything is present', (done) => {
    req.body = {}
    req.body.first_name = "Pinco"
    req.body.last_name = "Pallino"
    req.body.address = "via delle banane 1"
    expect (isValid(req)).is.true
    done();
  });
  it('address is missing', (done) => {
    req.body = {}
    req.body.first_name = "Pinco"
    req.body.last_name = "Pallino"
    req.body.address = null
    expect (isValid(req)).is.false
    done();
  })
})