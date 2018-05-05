import path from 'path';
import nodeExternals from 'webpack-node-externals';

const client = {
    target: 'web',
    entry: {
        js: './src/app-client.js'
    },
    output: {
        path: path.join(__dirname, 'src', 'static', 'js'),
        filename: 'bundle.js'
    }
}

const server = {
    target: 'node',
    node: {
        __dirname: false,
    },
    externals: [nodeExternals({
        modulesFromFile: true,
    })],
    entry: {
        js: './src/server.js'
    },
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'server-es5.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: 'cacheDirectory=.babel_cache',
                },
            },
        ],
    },
    devtool: 'source-map'
}


export default [client, server];
