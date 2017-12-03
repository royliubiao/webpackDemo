require('../styles/index.less');
/*父类*/
class Praise {
    constructor() {}
    clickBtn() {
        // Make a request for a user with a given ID 
        axios.get('/index/update')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(response) {
                console.log(response);
            });
    }
}
export default Praise;