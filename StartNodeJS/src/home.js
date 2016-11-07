var TTk =
require("../../toolkit/src/core/ttk.js");
require("../../toolkit/src/core/object.js");
require("../../toolkit/src/mvps/view.js");
require("../../toolkit/src/mvps/model.js");
require("../../toolkit/src/mvps/synclocal.js");
require("../../toolkit/src/widget/editinplace.js");
var TCN = require('./tcn.js');

TCN.ToucanoHomeView = (function(){

	// Create store for private properties
	var privates = TTk.Object.privateStore();

	// Constructor
	var ToucanoHomeView = function(model){
		this.initView();
		var priv = privates(this);

		priv.model = null;

		// Mapping from model attributes to CSS class
		priv.dataBind = {
			model:{
				splashTitle : PF + 'splashTitle',
				splashP : PF + 'splashP',
				trusted : PF + 'trusted',
				bspkh2 : PF + 'bspkh2',
				bspkh4 : PF + 'bspkh4',
				bspkul1 : PF + 'bspkul1',
				bspkul2 : PF + 'bspkul2',
				bspkul3 : PF + 'bspkul3',
				dbh2 : PF + 'dbh2',
				dbh4 : PF + 'dbh4',
				dbul1 : PF + 'dbul1',
				dbul2 : PF + 'dbul2',
				dbul3 : PF + 'dbul3',
				biexh2 : PF + 'biexh2',
				biexh4 : PF + 'biexh4',
				biexul1 : PF + 'biexul1',
				biexul2 : PF + 'biexul2',
				biexul3 : PF + 'biexul3',
				dashbuildh2 : PF + 'dashbuildh2',
				dashbuildh4 : PF + 'dashbuildh4',
				dashbuildul1 : PF + 'dashbuildul1',
				dashbuildul2 : PF + 'dashbuildul2',
				dashbuildul3 : PF + 'dashbuildul3',

			}
		};
	};

	// Define class
	ToucanoHomeView.CSS_CLASS = TCN.CSS_PREFIX + 'home';
	var PF = ToucanoHomeView.CSS_CLASS + "-";

	// Mixin view
	TTk.View.call(ToucanoHomeView.prototype, privates);


	// Render method (defined in TTk.View)
	ToucanoHomeView.prototype.render = function(v){
		var self = this;
		var priv = privates(this);
		if(!priv.model){
			TTk.ComponentGroup.GLOBAL.execAction('model-query', {class:TCN.HomeModel.CLASS}).then(function(response){
				priv.model = response && response.result ? response.result[0] : null;
				console.log("Query returned model", priv.model);
				if(!priv.model){ priv.model = new TCN.HomeModel(); }
				// Now the model is set, it is possible to render
				self.render();
			// If the query promise failes
			}, function(err){
				console.warn('Failed to query model', err);
				priv.model = new TCN.HomeModel();
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
			{T:'section', id:'splash', class:'hero cf',C:
				{class:'content',C:[
					{T:'img',class:PF+'splashimg', src:priv.model.prop('splashImg')},
					{class:'copy',C:[
						{class:'titles',C:
							{T:'h1',C:[
								{T:'span', class:PF+'splashTitle'}
							]}
					},
						{T:'p',class :PF+'splashP'},
						{class:'more',C:
							{T:'a', href:'/company/news.aspx#news09',C:[
								{T:'span',C:'Read Full Story '},
								{T:'i', class:"fa fa-arrow-circle-o-right fa-3x"}
							]}
					}
					]},
				]}
		},
			{T:'section', id:'trusted',class:'hero cf',C:
				{class:'content',C:
					{T:'h3',class: PF + 'trusted'}
			}
		},
			{T:'section', id:'app', class:'hero cf', C:
				{class:'content',C:[
						{class:'intro',C:[
							{T:'h2',C:'Dashboards'},
							{T:'img',src:priv.model.prop('imgPlaceHolder')},
							{class:'more',C:
								{T:'a', href:'/company/news.aspx#news09',C:[
									{T:'span',C:'Learn More '},
									{T:'i',class:'fa fa-caret-square-o-right'}
								]}
					},
						]},
						{class:'intro',C:[
							{T:'h2',C:'BeSpoke'},
							{T:'img',src:priv.model.prop('introImg2')},
							{class:'more',C:
								{T:'a', href:'/company/news.aspx#news09',C:[
									{T:'span',C:'Learn More '},
									{T:'i',class:'fa fa-caret-square-o-right'}
								]}
					},
						]},
						{class:'intro',C:[
							{T:'h2',C:'BI Extentions'},
							{T:'img',src:priv.model.prop('imgPlaceHolder')},
							{class:'more',C:
								{T:'a', href:'/company/news.aspx#news09',C:[
									{T:'span',C:'Learn More '},
									{T:'i',class:'fa fa-caret-square-o-right'}
								]}
					}
						]},
				]}
		},
			{T:'section', id:'bespoke', class:'hero cf', C:
				{class:'content',C:[
					{class:'copy',C:[
						{T:'h2',C:{T:'span', class:PF + 'bspkh2'}},
						{T:'h4',C:{T:'span', class:PF + 'bspkh4'}},
						{T:'ul',C:[
							{T:'li',C:{T:'span',class:PF+'bspkul1'}},
							{T:'li',C:{T:'span',class:PF+'bspkul2'}},
							{T:'li',C:{T:'span',class:PF+'bspkul3'}}
						]},
					]},
					{T:'img', src:priv.model.prop('imgPlaceHolder')}
				]}
		},
			{T:'section', id:'dashboards', class:'hero cf', C:
				{class:'content',C:[
				{T:'img', src:priv.model.prop('imgPlaceHolder')},
					{class:'copy', C:[
						{T:'h2',C:{T:'span', class: PF +'dbh2'}},
						{T:'h4',C:{T:'span', class: PF +'dbh4'}},
						{T:'ul',C:[
							{T:'li',C:{T:'span',class:PF+'dbul1'}},
							{T:'li',C:{T:'span',class:PF+'dbul2'}},
							{T:'li',C:{T:'span',class:PF+'dbul3'}}
						]}
					]}
				]}
		},
			{T:'section', id:'biext', class:'hero cf', C:
				{class:'content',C:[
					{class:'copy',C:[
						{T:'h2',C:{T:'span',class: PF + "biexh2"}},
						{T:'h4',C:{T:'span',class: PF + "biexh4"}},
						{T:'ul',C:[
							{T:'li',C:{T:'span',class: PF + 'biexul1'}},
							{T:'li',C:{T:'span',class: PF + 'biexul2'}},
							{T:'li',C:{T:'span',class: PF + 'biexul3'}}
						]}
					]},
					{T:'img', src:priv.model.prop('imgPlaceHolder')}
				]}
		},
			{T:'section', id:'builder', class:'hero cf', C:
				{class:'content',C:[
					{T:'img', src:priv.model.prop('imgPlaceHolder')},
					{class:'copy',C:[
						{T:'h2',C:{T:'span',class: PF +'dashbuildh2'}},
						{T:'h4',C:{T:'span',class: PF +'dashbuildh4'}},
						{T:'ul',C:[
							{T:'li',C:{T:'span',class: PF + 'dashbuildul1'}},
							{T:'li',C:{T:'span',class: PF + 'dashbuildul2'}},
							{T:'li',C:{T:'span',class: PF + 'dashbuildul3'}}
						]}
					]}
				]}
		}
		]);


		// Add edit handlers for editable fields
		Object.keys(priv.dataBind.model).forEach(function(k){
			var node = priv.nodes[priv.dataBind.model[k]];
			TTk.EditInPlace.setEditable(node, {
				resultFn:function(newVal){
					newVal = !newVal ? '' : newVal.trim();
					if(!newVal){ newVal = 'Default Value'; }
					//console.log("setting model", k, " = ", newVal);
					priv.model.prop(k, newVal);
				}
			});
		});

	};

	// Return constructor
	return ToucanoHomeView;
}());



/**
 * The Home section model.
 *
 * @class
 */
TCN.HomeModel = (function(){

	// Create store for private properties
	var privates = TTk.Object.privateStore();

	// Constructor
	var HomeModel = function(v, r){
		this.initModel(v, r);
	};

	// Defines the class name of this model, used to revive from JSON
	HomeModel.CLASS = "TCN.HomeModel";

	// Similar to defintion in TTk.Config
	HomeModel.PROPS = {
		navHome : {t:'string', d:'Home'} ,
		navOverview : {t:'string', d:'Overview'} ,
		navFeatures : {t:'string', d:'Features'} ,
		navGallery : {t:'string', d:'Gallery'} ,
		navCompany : {t:'string', d:'Company'},
		splashImg : {t:'string', d:'images/index/splash.jpg', l:'', e:''},
		splashTitle : {t:'string',d:'The D3 Analytics Accelerator',l:'',e:''},
		splashP : {t:'string', d:'D3 is the best and the most widely used visualisation library out there</br> We make it event better. </br> Buid anything from bespoke visualisation to perfect dashboards in a fraction of the time </br>'},
		trusted : {t:'string', d:'Trusted by Gartner Quadrant Clients',},
		introImg1: {t:'string', d:'/images/index/placeholder.png'},
		introImg2: {t:'string', d:'/images/index/phone.jpg'},
		introImg3: {t:'string', d:'/images/index/placeholder.png'},
		imgPlaceHolder : {t:'string', d:'/images/index/placeholder.png'},

		bspkh2 : {t:'string',d:'Bespoke Visualisations'},
		bspkh4 : {t:'string', d:'Tailored to your business'},
		bspkul1 : {t:'string', d:'Exactly as you need'},
		bspkul2 : {t:'string', d:'Built in a faction of the time'},
		bspkul3 : {t:'string', d:'Integrate with your data'},
		dbh2 : {t:'string',d:'Perfect dashboard'},
		dbh4 : {t:'string', d:'Beautiful Style Data'},
		dbul1 : {t:'string', d:'User Configurable'},
		dbul2 : {t:'string', d:'Modular dashboard environment'},
		dbul3 : {t:'string', d:'Built in analytics' },
		biexh2 : {t:'string',d:'BI Extentions'},
		biexh4 : {t:'string', d:'Data visualization and analysis'},
		biexul1 : {t:'string', d:'Extend your BI tools capability'},
		biexul2 : {t:'string', d:'Improved UX/UI'},
		biexul3 : {t:'string', d:"Integrates with BI tool's data layer"},
		dashbuildh2 : {t:'string',d:'Dashboard Builder'},
		dashbuildh4 : {t:'string', d:'All in your hand'},
		dashbuildul1 : {t:'string', d:'Easy data loader'},
		dashbuildul2: {t:'string', d:'Loads of styling options'},
		dashbuildul3: {t:'string', d:'Filtering and ad hoc analysis'}
	};

	// Mixin TTk.Model
	TTk.Model.call(HomeModel.prototype, privates);

	// Return constructor
	return HomeModel;
}());
