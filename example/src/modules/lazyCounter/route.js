const route = {
    path: 'lazy-counter',
    getComponent: (nextState, cb) => {
        import('./LazyCounterContainer').then(Component =>
            cb(null, Component.default));
    }
};
export default route;
