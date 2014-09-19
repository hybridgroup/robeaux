describe('parseParams', function(){

    beforeEach(module('robeaux'));

        
    it('should set param name to value', function(){
        var form = [
            { 'name': 'bool', 'value': 'TRUE', 'type': 'boolean' },
            { 'name': 'boole', 'value': 'sadg', 'type': 'boolean' },
            { 'name': 'str', 'value': 'isOn', 'type': 'string' },
            { 'name': 'num', 'value': 100, 'type': 'number' }
        ];
        var params = parseParams(form);
        expect(params['num']).toEqual(100);
        expect(params['bool']).toEqual(true);
        expect(params['boole']).toEqual(false);
        expect(params['str']).toEqual('isOn');
    });

    it('should set empty params to true', function(){
        var form = [
            { 'name': '', 'value': '', 'type': 'boolean' },
            { 'name': '21', 'value': '12','type': 'boolean' },
        ];
         
        expect(paramsAreEmpty([form[1]])).toEqual(false);
        expect(paramsAreEmpty([form[0]])).toEqual(true);
    });

});