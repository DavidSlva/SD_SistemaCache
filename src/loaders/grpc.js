const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const { PROTO_PATH, HOST } = require("../config");
// const PROTO_PATH = "../post.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
  
var packageDefinition = protoLoader.loadSync(`src/${PROTO_PATH}`, options);

const postProto = grpc.loadPackageDefinition(packageDefinition);

const { PostService, PostRequest } = postProto;

const client = new postProto.PostService(
    `${HOST}:50051`,
    grpc.credentials.createInsecure()
);



module.exports = {
    client,
    PostRequest
}

