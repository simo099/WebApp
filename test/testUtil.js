import chai from 'chai';
import createPatchQuery from '../src/util.js';

/** 
 * Create patch query: update Database's table fields. 
 * @requires module chai
 * @constant expect
 * @requires createPatchQuery
*/ 

const expect = chai.expect;

describe('util', () => {
    it('create patch query', (done) =>{
        expect (createPatchQuery({"first_name":"Gino"})).to.equal("UPDATE users SET first_name=$(first_name)")
        expect (createPatchQuery({"first_name":"Gino", "last_name":"Rossi"})).to.equal("UPDATE users SET first_name=$(first_name),last_name=$(last_name)")
        done();
    })
})