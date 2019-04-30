import path from "path";
import webpack from "webpack";

const config: webpack.Configuration = {
    mode: "production",
    entry: {
        main: "./src/main.ts",
        sw: "./src/sw.ts"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    }
};

export default config;
