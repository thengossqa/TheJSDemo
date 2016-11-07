var TTk =
require("../../toolkit/src/core/ttk.js");
//require("../../toolkit/src/mvps/view.js");
require("../../toolkit/src/mvps/workflow.js");
require("../../toolkit/src/mvps/model.js");
require("../../toolkit/src/mvps/synclocal.js");
require("../../toolkit/src/widget/editinplace.js");
require("../../toolkit/src/core/object.js");

var TCN =
require('./tcn.js');
require('./gallery.js');
require('./overview.js');
require('./home.js');





/**
 * The MAIN MODEL.
 *
 * @class
 */
TCN.MainModel = (function(){

	// Create store for private properties
	var privates = TTk.Object.privateStore();

	// Constructor
	var MainModel = function(v, r){
		this.initModel(v, r);
	};

	// Defines the class name of this model, used to revive from JSON
	MainModel.CLASS = "TCN.MainModel";

	// Similar to defintion in TTk.Config
	MainModel.PROPS = {
		maintitle : {t:'string', d:'Visualisation & Analytics Accelerator'},
		navHome : {t:'string', d:'Home'} ,
		navOverview : {t:'string', d:'Overview'} ,
		navFeatures : {t:'string', d:'Features'} ,
		navGallery : {t:'string', d:'Gallery'} ,
		navCompany : {t:'string', d:'Company'},
		contactStarted : { t:'string', d:'Get Started'},
		contactEmail : {t:'string', d:'support@toucano.uk'},
	};

	// Mixin TTk.Model
	TTk.Model.call(MainModel.prototype, privates);


	// Return constructor
	return MainModel;
}());



TCN.ToucanoSite = (function(){

	// Create store for private properties
	var privates = TTk.Object.privateStore();


	// Constructor
	var ToucanoSite = function(model){
		var priv = privates(this);
		Workflow.call(this, true);

		var pfx = ToucanoSite.CSS_CLASS + '-';

		// Create view for the each page
		priv.galleryView = new TCN.ToucanoGalleryView();

		priv.OverviewView = new TCN.ToucanoOverviewView();

		priv.HomeView = new TCN.ToucanoHomeView();

		priv.model = null;

		// Mapping from model attributes to CSS class
		priv.dataBind = {
			model:{
				navHome : [pfx +'navHome1', pfx +'navHome2'],
				navOverview : [pfx +'navOverview1', pfx +'navOverview2'],
				navFeatures : [pfx +'navFeatures1', pfx +'navFeatures2'],
				navGallery : [pfx +'navGallery1', pfx +'navGallery2'],
				navCompany : [pfx +'navCompany1', pfx +'navCompany2'],
				maintitle : [pfx +'maintitle', pfx + 'maintitle2'],
				contactStarted : pfx + 'contactStarted',
				contactEmail : pfx + 'contactEmail'

			}
		};
		// priv.model = new TCN.MainModel();
		// Initialise sub-views
		this.home('home').missing('error').views({
			'home' : priv.HomeView,
			'overview':priv.OverviewView,
			'gallery':priv.galleryView,
			'error':[
				{T:'h1', C:'Not Found'},
				{C:'The page you are looking for does not exist.'},
				{T:'a', href:'#home', C:'Back to home page'}
			]
		});

	};


	// Extend Workflow class
	var Workflow = TTk.Workflow.extend(ToucanoSite, privates);


	// Override workflow render
	ToucanoSite.prototype.render = function(){
		var self = this;
		var priv = privates(this);
		var pfx = ToucanoSite.CSS_CLASS + '-';


		if(!priv.model){
			TTk.ComponentGroup.GLOBAL.execAction('model-query', {class:TCN.MainModel.CLASS}).then(function(response){
				priv.model = response && response.result ? response.result[0] : null;
// console.log("Query returned model", priv.model);
				if(!priv.model){ priv.model = new TCN.MainModel(); }
				// Now the model is set, it is possible to render
				self.render();
			// If the query promise failes
			}, function(err){
				console.warn('Failed to query model', err);
				priv.model = new TCN.MainModel();
				self.render();
			});
			return;
		}

		// First render - creates the outer frame
		if(!priv.frame){
			buildDom.call(self);
		}


		// Render current view
		var view = this.view();
		if(view){
			view.container('main.' + pfx + 'content').render();
			return;
		}

	};

	var buildDom = function(){
		var priv = privates(this);
		var pfx = ToucanoSite.CSS_CLASS + '-';
		priv.appendElements([
			{T:'header',C:[
				{class:'masthead',C:[
					{class:'content',C:[
						{class:'logo',C:
							{T:'a', href:'/', C:
								{T:'img', src:'images/header/logo_ondark.png'}
							}
						},
						{T:'div',class:'maintitle',C:
							{T:'h1', class:pfx+'maintitle', C:'Visualisation & Analytics Accelerator'}
						},
						{id:'iconeml', C:
							{T:'a', href:'mailto:support@toucano.uk', C:
								{T:'i',class:'fa fa-envelope-o'}
							},
						},
						{id:'navbtn', class:'collapsed', C:[
							{T:'a', id:'dropdown'},
							{T:'ul', id:'navmobile', C:[
								{T:'li', C:{T:'a',href:'#home',  class: pfx+'navHome1', C:'Home'}},
								{T:'li', C:{T:'a',href:'#overview', C:'Overview', class: pfx+'navOverview1'}},
								{T:'li', C:{T:'a',href:'#features', C:'Features', class:pfx+'navFeatures1'}},
								{T:'li', C:{T:'a',href:'#gallery', C:'Gallery', class:pfx+'navGallery1'}},
								{T:'li', C:{T:'a',href:'#company', C:'Company', class:pfx+'navCompany1' }}
							]}
						]},
						{class:'contact', C:[
							{T:'ul',class:'links', C:
								{T:'li',class:'start', C:
									{T:'a',href:'/start/', class:'start', C:
										{T:'span', class: pfx +'contactStarted', C:'Get Started'}
									}
								}
							},
							{class:'sales', C:
								{T:'p',C:[
									{T:'span',C:'Contact Support:  '},
									{T:'span',C:
										{T:'a', href:'mailto:support@toucano.uk', class: pfx + 'contactEmail'}
									}
								]}
							}
						]},
					]},
				]},
				{class:'subhead',C:
					{T:'h2', class:pfx + 'maintitle2', C:'Visualisation & Analytics Accelerator'}
				},
				{T:'nav', C:[
					{T:'div', class:'content', C:[
						{T:'ul', C:[
							{T:'li', C:{T:'a',href:'#home', C:'Home', class:pfx+'navHome2' }},
							{T:'li', C:{T:'a',href:'#overview', C:'Overview',class:pfx+'navOverview2'}},
							{T:'li', C:{T:'a',href:'#features', C:'Features',class:pfx+'navFeatures2'}},
							{T:'li', C:{T:'a',href:'#gallery', C:'Gallery',class:pfx+'navGallery2' }},
							{T:'li', C:{T:'a',href:'#company', C:'Company', class:pfx+'navCompany2'}}
						]}
					]}
				]}
			]},
			{T:'main', class: pfx + 'content'},
			/*{T:'footer', C:[
				{T:'div', class:'content',C:[
					{T:'div',class:'microsoft',C:
						{T:'img',src:'/images/header/logo_ondark.png'}
				},
					{T:'p', class:'indicia', C:'Copyright © 2016'+' Toucano Software Inc. All rights reserved.'},
					{T:'ul',class:'links', C:[
						{T:'li', class:'mobile', C:{
							T:'a',href:'/mobile.aspx?id=704',target:'blank',C:
								{T:'span',C:'Mobile Site'}
						}
					},
						{T:'li', class:'terms', C:{
							T:'a',href:'/terms.aspx',target:'blank',C:
								{T:'span',C:'Terms of Use'}
						}},
						{T:'li', class:'privacy', C:{
							T:'a',href:'/privacy.aspx',target:'blank',C:
								{T:'span',C:'Privacy Statement'}
						}}
						]},
					{T:'ul', class:'social', C:[
						{T:'li', class:'facebook',C:{
							T:'a',href:'http://www.facebook.com/toucano.uk', target:"_blank", C:{
								T:'i', class:"fa fa-facebook-square", 'aria-hidden':true
							}
						}
					},
						{T:'li', class:'twitter',C:{
							T:'a',href:'http://twitter.com/toucano.ukbi', target:"_blank", C:{
								T:'i', class:"fa fa-twitter fa-2", 'aria-hidden':true
							}
						}
					},
						{T:'li', class:'linkedin',C:{
							T:'a',href:'http://www.linkedin.com/company/toucano.uk', target:"_blank", C:{
								T:'i', class:"fa fa-linkedin-square fa-3", 'aria-hidden':true
							}
						}
					},
						{T:'li', class:'youtube',C:{
							T:'a',href:'http://youtube.com/user/toucano.ukbi', target:"_blank", C:{
								T:'i', class:"fa fa-youtube", 'aria-hidden':true
							}
						}
					}
						]}
					]}
				]},
				*/
			{T:'a', href:"#top"}
		]);

		// Add event handlers
		priv.nodes.dropdown.addEventListener('click', function(){
			var isCollapsed = priv.nodes.navbtn.classList.contains('collapsed');
			priv.nodes.navbtn.classList[isCollapsed ? 'remove' : 'add']('collapsed');
		});

		priv.nodes.navmobile.addEventListener('click', function(){
			priv.nodes.navbtn.classList.add('collapsed');
		});

		// Add edit handlers for editable fields of main model
		Object.keys(priv.dataBind.model).forEach(function(k){
			var ary = priv.dataBind.model[k];
			if(!Array.isArray(ary)){
				ary = [ary];
			}
			console.log(k);
			ary.forEach(function(nodeKey){
				var node = priv.nodes[nodeKey];
				TTk.EditInPlace.setEditable(node, {
					resultFn:function(newVal){
						newVal = !newVal ? '' : newVal.trim();
						if(!newVal){ newVal = 'No Value'; }
						//console.log("setting model", k, " = ", newVal);
						priv.model.prop(k, newVal);
					}
				});
			});
		});
	};

	ToucanoSite.CSS_CLASS = "tcn";

	// Return constructor
	return ToucanoSite;

}());


new TCN.ToucanoSite();

