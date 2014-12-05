var html = "text/html";

var encoding = "UTF-8";

var ClientSideResourceManager = Packages.com.google.refine.ClientSideResourceManager;

var LF = Packages.org.slf4j.LoggerFactory;
var logger = LF.getLogger("geturl-extension");

function init() {
ClientSideResourceManager.addPaths(
       "index/scripts",
       module,
       [
           "scripts/index/geturl.js"
       ]
);

  logger.info("Loaded geturl extension");

}

function process(path, request, response){
   if (path == "/" || path == "") {
    var context = {};
    context.scriptInjection = '<script type="text/javascript" src="/extension/geturl/scripts/index/geturl.js"></script>';

    //return "Hello world!";
    send(request, response, "index.vt", context);
  }
}

function send(request, response, template, context) {
  butterfly.sendTextFromTemplate(request, response, context, template, encoding, html);
}
