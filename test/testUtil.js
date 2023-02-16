import chai from 'chai';
import createPatchQuery from '../src/util.js';

const expect = chai.expect;

//`UPDATE users SET (first_name, last_name, address) VALUES ($(first_name),$(last_name),$(address)) WHERE id=${id}`

describe('util', () => {
    it('create patch query', (done) =>{
        expect (createPatchQuery({"first_name":"Gino"})).to.equal("UPDATE users SET first_name=$(first_name)")
        expect (createPatchQuery({"first_name":"Gino", "last_name":"Rossi"})).to.equal("UPDATE users SET first_name=$(first_name),last_name=$(last_name)")
        done();
    })
})