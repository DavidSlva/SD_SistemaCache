const JsonPhService = require("./services/jsonPh");

const protoLoader = require("@grpc/proto-loader");

const grpc = require("@grpc/grpc-js");
const { HOST } = require("./config");
const PROTO_PATH = "./post.proto";


const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const postsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const JsonPh = new JsonPhService()

server.addService(postsProto.PostService.service, {
    GetPost: async  (call, callback) => {

        const id = call.request.getId();
        const value = await JsonPh.get('/posts/'+id)

        const post = new postsProto.PostResponse();

        post.setUserId(value.userId);
        post.setId(value.id);
        post.setTitle(value.title);
        post.setBody(value.body);

        callback(null, post);
    },
});

server.bindAsync(
    `${HOST}:50051`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log(`Server running at http://${HOST}:50051`);
      server.start();
    }
);
