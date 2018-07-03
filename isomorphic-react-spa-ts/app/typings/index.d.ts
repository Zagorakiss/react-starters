// tslint:disable
/// <reference types="node" />

interface Window {
    __REDUX_STATE__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <F extends Function>(f: F) => F;
}

interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

interface NodeModule {
    hot: {
        accept: (pathToRootComponent: string, callback: () => void) => void
    };
}
