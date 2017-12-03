import index from "../controllers/indexController";

//定义路由 
const ControllerInit = {
    init(app, router) {
        app.use(router(_ => {
            _.get('/index/index', index.index());
            _.get('/index/update', index.update());
        }))
    }
}

export default ControllerInit;