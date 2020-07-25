import { ConnRun, ConnRunCallbackOptions } from '../'

const MONGODBURI = 'mongodb://localhost:8000'
const ELSE_MONGODBURI = 'mongodb://localhost:8000'

// your functions - func1, func2, run ,elseRun, taht following "pattern" represented in "README.md"
const func1 = ({ client }: ConnRunCallbackOptions) => async (a: any, b: any) => {
};
const func2 = ({ client }: ConnRunCallbackOptions) => async () => {
};
const run = ({ client }: ConnRunCallbackOptions) => async () => {
    await func1({ client })('a', 'b')
    await func2({ client })()

    await ConnRun({ url: ELSE_MONGODBURI }, elseRun, 'c', 'd')
};
const elseRun = ({ client }: ConnRunCallbackOptions) => async (c, d) => {
};


ConnRun({ url: MONGODBURI }, run)