const route = {
    path: 'sync-counter',
    getComponent: (nextState, cb) => {
        import('./SyncCounterContainer').then(Component =>
            cb(null, Component.default));
    }
};
export default route;
