(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['recipe'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "              <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"food\">\r\n  <img class=\"food-photo\" src="
    + alias4(((helper = (helper = lookupProperty(helpers,"photo") || (depth0 != null ? lookupProperty(depth0,"photo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photo","hash":{},"data":data,"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":39}}}) : helper)))
    + " />\r\n  <div class=\"food-info\">\r\n    <p class=\"name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":20},"end":{"line":4,"column":28}}}) : helper)))
    + "</p>\r\n    <p class=\"time\">Prep Time: "
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":5,"column":31},"end":{"line":5,"column":39}}}) : helper)))
    + "</p>\r\n  </div>\r\n  <div class=\"button-bar\">\r\n    <button id=\"trash\"><i class=\"fas fa-trash-alt\"></i></button>\r\n    <button id=\"utensils\"><i class=\"fas fa-utensils\"></i></button>\r\n  </div>\r\n  <div id=\"modal-backdrop\" class=\"hidden\"></div>\r\n  <div id=\"recipe-modal\" class=\"hidden\">\r\n    <div class=\"modal-dialog\">\r\n      <div class=\"modal-header\">\r\n        <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":15,"column":20}}}) : helper)))
    + "</h3>\r\n        <button type=\"button\" class=\"modal-close-button\" id=\"close-recipe-modal\">&times;</button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"modal-content-ing\">\r\n          <div>Ingredients:</div>\r\n          <ul class=\"ingredients\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"ingredients") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":12},"end":{"line":24,"column":21}}})) != null ? stack1 : "")
    + "          </ul>\r\n        </div>\r\n        <div class=\"modal-content-ins\">\r\n          <div>Directions:</div>\r\n            <ul class=\"instructions\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"directions") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":14},"end":{"line":32,"column":23}}})) != null ? stack1 : "")
    + "            </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div id=\"not-match-modal-backdrop\" class=\"hidden\"></div>\r\n  <div id=\"not-match-modal\" class=\"hidden\">\r\n    <div class=\"not-match-modal-dialog\">\r\n      <div class=\"modal-header\">\r\n        <h3>Sorry it's not a match...</h3>\r\n        <button type=\"button\" class=\"modal-close-button\" id=\"close-not-match-modal\">&times;</button>\r\n        <div class=\"heart\"><i class=\"fas fa-heart-broken\"></i></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n";
},"useData":true});
templates['match'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                            <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"food\">\r\n    <img class=\"food-photo\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"photo") || (depth0 != null ? lookupProperty(depth0,"photo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photo","hash":{},"data":data,"loc":{"start":{"line":2,"column":33},"end":{"line":2,"column":42}}}) : helper)))
    + "\" />\r\n    <div class=\"food-info\">\r\n        <p class=\"name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":24},"end":{"line":4,"column":32}}}) : helper)))
    + "</p>\r\n        <p class=\"time\">Time: "
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":5,"column":30},"end":{"line":5,"column":38}}}) : helper)))
    + "</p>\r\n    </div>\r\n    <div class=\"button-bar\">\r\n        <button class=\"see-more\">Recipe <i class=\"fas fa-book-open\"></i></button>\r\n    </div>\r\n\r\n    <div id=\"modal-backdrop\" class=\"hidden match-modal\"></div>\r\n    <div id=\"recipe-modal\" class=\"hidden match-modal\">\r\n        <div class=\"modal-dialog\">\r\n            <div class=\"modal-header\">\r\n                <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":15,"column":20},"end":{"line":15,"column":28}}}) : helper)))
    + "</h3>\r\n            <button type=\"button\" class=\"modal-close-button\" id=\"close-match-recipe-modal\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"modal-content-ing\">\r\n                    <div>Ingredients:</div>\r\n                    <ul class=\"ingredients\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"ingredients") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":24},"end":{"line":24,"column":33}}})) != null ? stack1 : "")
    + "                    </ul>\r\n                </div>\r\n                <div class=\"modal-content-ins\">\r\n                    <div>Directions:</div>\r\n                    <ul class=\"instructions\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"directions") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":24},"end":{"line":32,"column":33}}})) != null ? stack1 : "")
    + "                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n";
},"useData":true});
})();