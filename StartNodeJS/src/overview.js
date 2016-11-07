var TTk =
require("../../toolkit/src/core/ttk.js");
require("../../toolkit/src/core/object.js");
require("../../toolkit/src/mvps/view.js");
require("../../toolkit/src/mvps/model.js");
require("../../toolkit/src/mvps/synclocal.js");
require("../../toolkit/src/widget/editinplace.js");
var TCN = require('./tcn.js');

TCN.ToucanoOverviewView = (function(){

	// Create store for private properties
	var privates = TTk.Object.privateStore();

	// Constructor
	var ToucanoOverviewView = function(model){
		this.initView();
		var priv = privates(this);

		priv.model = null;

		// Mapping from model attributes to CSS class
		priv.dataBind = {
			model:{
				somep    		: PF + 'somep',
			}
		};
	};

	// Define class
	ToucanoOverviewView.CSS_CLASS = TCN.CSS_PREFIX + 'over';
	var PF = ToucanoOverviewView.CSS_CLASS + "-";

	// Mixin view
	TTk.View.call(ToucanoOverviewView.prototype, privates);


	// Render method (defined in TTk.View)
	ToucanoOverviewView.prototype.render = function(v){
		var self = this;
		var priv = privates(this);
		if(!priv.model){
			TTk.ComponentGroup.GLOBAL.execAction('model-query', {class:TCN.OverviewModel.CLASS}).then(function(response){
				priv.model = response && response.result ? response.result[0] : null;
				console.log("Query returned model", priv.model);
				if(!priv.model){ priv.model = new TCN.OverviewModel(); }
				// Now the model is set, it is possible to render
				self.render();
			// If the query promise failes
			}, function(err){
				console.warn('Failed to query model', err);
				priv.model = new TCN.OverviewModel();
				self.render();
			});
			return;
		}
		// Construct the view
		if(!priv.frame){
			buildDom.call(self);
		}
		// Update the view
		//priv.nodes['gallery'].innerHTML = priv.model.val1();
		//document.querySelector('.gallery >a').setAttribute("class", "selected");
	};

	var buildDom = function(){
		var priv = privates(this);
// Append the dom definition
		priv.appendElements([
				{T:'section', id:'overview', C:[
					{class:'content', C:[
						{T:'h1', class:'title light', C:'Overview'},
						{T:'section', id:'hero', clash:'hero cf',	C:[
							{T:'img', class:'hero', src:priv.model.prop('imgPlaceHolder')},
							{T:'ul', C:[
								{T:'li',class:'win8',C:[
									{T:'img', src:priv.model.prop('imgPlaceHolder'), alt:'Thumbnail'},
									{T:'span',src:'Windows'}
								]},
								{T:'li',class:'ios',C:[
									{T:'img',src:priv.model.prop('imgPlaceHolder'), alt:'Thumbnail'},
									{T:'span',src:'Windows'}
								]},
								{T:'li',class:'android', C:[
									{T:'img',src:priv.model.prop('imgPlaceHolder'), alt:'Thumbnail'},
									{T:'span',src:'Windows'}
								]},
								{T:'li',class:'html5', C:[
									{T:'img',src:priv.model.prop('imgPlaceHolder'), alt:'Thumbnail'},
									{T:'span',src:'Windows'}
								]}
							]},
							{T:'p',C:'Toucano Windows 8 app enables dashboard creation and publishing based on Excel, cloud and enterprise data sources. After publishing to a Toucano Server, dashboards and KPIs are accessible on any device via its native app, or through any major browser.'},
					]},
					]},

					{T:'section', id:'server',C:[
						{class:'content',C:[
								{T:'img',src:priv.model.prop('imgPlaceHolder')},
						{T:'h2', C:'Toucano Server Feature Highlights'},
						{T:'ul',C:[
							{T:'li',C:{T:'span', class:PF+'somep' , C:''}},
							{T:'li',C:{T:'span',C:'Integrate with Active Directory for user authentication'}},
							{T:'li',C:{T:'span',C:'Publish dashboards securely within your IT environment'}},
							{T:'li',C:{T:'span',C:'Deliver live data updates to mobile devices'}},
							{T:'li',C:{T:'span',C:'Personalize data queries for each user'}},
							{T:'li',C:{T:'span',C:'Integrate corporate branding'}},
						]},
						{T:'p',C:{T:'span',C:'Toucano Server Feature Details'}}
						]},
					]}
				]}
		]);


		Object.keys(priv.dataBind.model).forEach(function(k){
			var node = priv.nodes[PF + k];
			TTk.EditInPlace.setEditable(node, {
				resultFn:function(newVal){
					newVal = !newVal ? '' : newVal.trim();
					if(!newVal){ newVal = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; }
					priv.model.prop(k, newVal);
				}
			});
		});

		// Add edit handlers for editable fields


	};

	// Return constructor
	return ToucanoOverviewView;
}());



/**
 * The gallery section model.
 *
 * @class
 */
TCN.OverviewModel = (function(){

	// Create store for private properties
	var privates = TTk.Object.privateStore();

	// Constructor
	var OverviewModel = function(v, r){
		this.initModel(v, r);
	};

	// Defines the class name of this model, used to revive from JSON
	OverviewModel.CLASS = "TCN.OverviewModel";

	// Similar to defintion in TTk.Config
	OverviewModel.PROPS = {
		somep   :{t:'string', d:'Integrate with Active Directory for user authentication', l:'', e:''},
		imgPlaceHolder : {t:'string', d:'/images/index/placeholder.png'}
	};

	// Mixin TTk.Model
	TTk.Model.call(OverviewModel.prototype, privates);

	// Return constructor
	return OverviewModel;
}());
