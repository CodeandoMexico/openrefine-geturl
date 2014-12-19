function sleep(mls, callback) {
  setTimeout(callback, mls);
}

function setResource (element, resource) {
  console.log("This is the element " + element);
  return function () {
    element = $("#create-project-ui-source-selection-tabs").children()[2];
    console.log("Activate Web address div");
    element.click();
    console.log("Set resource on download");
    $("input[name='download']").val(resource);
    $("button[bind='nextButton']")[1].click();
  };
}

function getResource() {
    var plain_query = window.location.search.substring(1);
    var query = get_query_as_json(plain_query);
    if (query["resource"] && validUrl(query["resource"])) {
      return  query["resource"];
    } 

    if (query["resource"] && validUrl(decodeURIComponent(query["resource"])) {
      return decodeURIComponent(query["resource"]);
    }
    

   return null;
}

function validUrl(url) {
     return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?/) != null ? true : false;
}

function get_query_as_json(plain_query) {
  var assig =  plain_query.split("&");
  var dict = {}

  if (assig.length > 0) {
    for (i in assig) {
      var dictElem = assig[i].split("=");
      if (dictElem.length >= 2) dict[dictElem.shift()] = dictElem.join('=').replace(/\+/g, "%20");
    }
  }

  return dict;
}

function viewElement(resource) {
  function inner() {
    var elem = $("#create-project-ui-source-selection-tabs").children()[2];
    if ( elem === undefined){
      sleep(500, inner);
    }
    else{
      setResource($("#create-project-ui-source-selection-tabs").children()[2], resource)();

    }
  }
  return inner;
}

var resource = getResource();

if (resource !== "" && resource != null && resource !== undefined)
  $("#create-project-ui-source-selection-tabs").ready(viewElement(resource));
