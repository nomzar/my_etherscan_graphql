const { ApolloServer } = require("apollo-server");    // Import Apollo Server
const { importSchema } = require("graphql-import");   // Import GraphQL Import 
const EtherDataSource = require("./datasource/ethDatasource");    // Import Ether Data Source
const typeDefs = importSchema("./schema.graphql");   // Import GraphQL Schema

require("dotenv").config();    // Load.env file

const resolvers = {                // Define Resolvers
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>    // Query to get ether balance
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>      // Query to get total supply of ether
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>     //Query to get latest ethereum price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>   //Query to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({         // Create Apollo Server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),    // Create Ether Data Source
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {           // Start Apollo Server
  console.log(`🚀 Server ready at ${url}`);
});
