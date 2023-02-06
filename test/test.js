import chai from 'chai';
const expect = chai.expect;
import {isValid} from "../src/validator.js";

/** 
* Test validation
* Check whether data is present, missing and empty
*/ 
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
    req.body.address = "via delle Banane 1"
    expect (isValid(req)).is.true
    done();
  });
  it('first name is missing', (done) => {
    req.body = {}
    req.body.first_name = null
    req.body.last_name = "Pallino"
    req.body.address = "via delle Rose 1"
    expect (isValid(req)).is.false
    done();
  });
  it('last name is missing', (done) => {
    req.body = {}
    req.body.first_name = "Pinco"
    req.body.last_name = null 
    req.body.address = "via delle Rose 1"
    expect (isValid(req)).is.false
    done();
  });
  it('address is missing', (done) => {
    req.body = {}
    req.body.first_name = "Pinco"
    req.body.last_name = "Pallino"
    req.body.address = null
    expect (isValid(req)).is.false
    done();
  });
  it('first name is empty', (done) => {
    req.body = {}
    req.body.first_name = ""
    req.body.last_name = "Pallino"
    req.body.address = "via delle Rose 1"
    expect (isValid(req)).is.false
    done();
  });
  it('last name is empty', (done) => {
    req.body = {}
    req.body.first_name = "Pinco"
    req.body.last_name = ""
    req.body.address = "via delle Rose 1"
    expect (isValid(req)).is.false
    done();
  });
  it('address is empty', (done) => {
    req.body = {}
    req.body.first_name = "Pinco"
    req.body.last_name = "Pallino"
    req.body.address = ""
    expect (isValid(req)).is.false
    done();
  });
})