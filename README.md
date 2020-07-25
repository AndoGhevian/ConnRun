# ConnRun
What doe's this library? Honestly nothing special. It's just connecting to "**mongodb**" database for you, and additionally gives you
some _pattern_, that you can deside to use or not. That's it.
It's just connect to db, and give you a _client_ instance on which you can perform same stuff as you was before.
And in turn, It's still your responsability to configure this connection. And now you think, _why i need this package,
if I still responsible for all this routine stuff_, and this how I answere to this question -

**IF (**
1. You dont want to run again and again through same steps of diving in to the [**mongod nodejs driver**][node-mongodb-native]
documentation to see the examples of how they do that stuff, and implement same thing one to one, maybe with some variable name changes in your project.
1. Or you simply want to start learn **mongodb** with native driver, immediately starting from _CRUD Opperations_ for example.
1. You want to fetch some data from somewhere as soon as posible, and store it somewhere, and you allready now how to use **mongodb nodejs driver**,
then just install this package in your project, give it a url, and immediately get client instance to perform opperartions...
1. You can not make a choice on how it is more convenient to pass your client instance to your functions, maybe alongside to your regular arguments,
or maybe differently, well, I'll give you a pattern, I think is not bad, at least its good for fast projects, for which I designed this package originally.

**)** **Then this library may be usefull for you.** 

## Installation
1. Navigate to your project folder. **cmd:** `cd myprojectDir`
1. If your project still not initialized by **npm**, i.e. theres no **package.json** file, initialize It, for simplicity you can just type **cmd:** `npm init -y`
1. Install the package locally. **cmd:** `npm i -S connrun` ( Same as **cmd:** `npm install --save connrun` )

# Usage
Let me descibe It's simplest usage. Just look at the code below:
```javascript
const { connRun } = require('connrun') 

const MONGODBURI = 'mongodb://localhost:8000'

const connRunCallback = ({ client }) => () => client

const yourApp = async () => {
        const client = await ConnRun({ url: MONGODBURI }, connRunCallback)
        // // Do Some stuff...

        // // 1. For example:
        // const db = client.db('mydb')
        // const collection = db.collection('mycollection')
        // // and soo on...

        // // 2. Or call your own functions
        // await myfunction(client, ...args)

        await client.close()
}
```
Here we simply pass to **ConnRun** function "_options_" object with _url_ property which contains url of database - as first parameter, and a function which returns another function, which are will be executed by **connRun** automaticaly - as second parameter, and we get **MongoClient** instance after promise returned by **connRun** function resolves,
and thereafter we do anything what wee need.

But now lets consider the case when we have to write some functions which are rely on _client_ instance, then we might deside how to pass that _client_ instance to that functions to get most convenient and most consistant way to stick with afterwardes in our project when writing such a functions... For that reasone I introduce a pattern, which can help you on that way, Lets write all our functions which expect _client_ instance, following this pattern: `({ client }) => () => //mystuff`
Benefits of this pattern are following:

1. In this case arguments of your _base_ function will not interfere with arguments, that **ConnRun** will pass to you.
and in case when you deside to change signiture of your _base_ function, It will be truly simple.
2. You can reuse this functions without **ConnRun**, as any function you write with this pattern In the end has all nessesery arguments to internally call another functions with the same pattern.
3. And of course afterwards you can follow this pattern to very end of your project.
See The [**Examples**][examples]

That's It, hop this will be useful for you

## TypeDefinitions
> See [typedefs][typedefs]

You Can Get ConnRun either as default export or named export... And if writing with _vanila javascript_, using `const ConnRun = require('connrun')` you not getting features like intelliSence, try to use named exports: `const { ConnRun } = require('connrun')`

[node-mongodb-native]: https://mongodb.github.io/node-mongodb-native/
[typedefs]: https://github.com/AndoGhevian/ConnRun/tree/master/dist/index.d.ts
[examples]: https://github.com/AndoGhevian/ConnRun/tree/master/src/examples