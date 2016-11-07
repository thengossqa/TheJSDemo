var TTk =
require("../../toolkit/src/core/ttk.js");
require("../../toolkit/src/core/object.js");
require("../../toolkit/src/mvps/view.js");
require("../../toolkit/src/mvps/model.js");
require("../../toolkit/src/mvps/synclocal.js");
require("../../toolkit/src/widget/editinplace.js");

var TCN = require('./tcn.js');

TCN.ToucanoGalleryView = (function(){

	// Create store for private properties
	var privates = TTk.Object.privateStore();

	// Constructor
	var ToucanoGalleryView = function(model){
		this.initView();
		var priv = privates(this);

		priv.model = null;

		// Mapping from model attributes to CSS class
		priv.dataBind = {
			model:{
				getit    :PF + 'getit',
				windowtitle : PF+ 'windowtitle',
				appStoretitle : PF +'appStoretitle',
				caption1 : [PF +'caption1w', PF +'caption1i'],
				caption2 : [PF +'caption2w', PF +'caption2i'],
				caption3 : [PF +'caption3w', PF +'caption3i'],
				caption4 : [PF +'caption4w', PF +'caption4i'],
				caption5 : [PF +'caption5w', PF +'caption5i'],
				caption6 : [PF +'caption6w', PF +'caption6i']
			}
		};
	};

	// Define class
	ToucanoGalleryView.CSS_CLASS = TCN.CSS_PREFIX + 'gal';
	var PF = ToucanoGalleryView.CSS_CLASS + "-";

	// Mixin view
	TTk.View.call(ToucanoGalleryView.prototype, privates);


	// Render method (defined in TTk.View)
	ToucanoGalleryView.prototype.render = function(v){
		var self = this;
		var priv = privates(this);
		if(!priv.model){
			TTk.ComponentGroup.GLOBAL.execAction('model-query', {class:TCN.GalleryModel.CLASS}).then(function(response){
				priv.model = response && response.result ? response.result[0] : null;
				console.log("Query returned model", priv.model);
				if(!priv.model){ priv.model = new TCN.GalleryModel(); }
				// Now the model is set, it is possible to render
				self.render();
			// If the query promise failes
			}, function(err){
				console.warn('Failed to query model', err);
				priv.model = new TCN.GalleryModel();
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
			{T:'section',id:'gallery', C:[
				{T:'section', class:'images windows viewer cf', id:'viewer',C:[
					{class:'heading',C:[
						{T:'a', href:'http://apps.microsoft.com/webpdp/app/Toucano',C:
							{T:'span', class:PF + 'getit', C:''}
						},
							{T:'h3',class:PF + 'windowtitle',C:''}
						]},
						{T:'ul', class:'cf',C :[
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsWindow')[0][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsWindow')[0][1], src:priv.model.prop('imgsWindow')[0][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span', class:PF +'caption1w', C:'Toucano Index -KPIs'}
							]},
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsWindow')[1][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsWindow')[1][1], src:priv.model.prop('imgsWindow')[1][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span', class:PF +'caption2w',C:'Toucano Index -Dashboards'}
							]},
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsWindow')[2][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsWindow')[2][1], src:priv.model.prop('imgsWindow')[2][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span',class:PF +'caption3w',C:'Toucano Index -Selected'}
							]},
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsWindow')[3][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsWindow')[3][1], src:priv.model.prop('imgsWindow')[3][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span',class:PF +'caption4w',C:'Corporate Scorecard'}
							]},
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsWindow')[4][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsWindow')[4][1], src:priv.model.prop('imgsWindow')[4][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span',class:PF +'caption5w' ,C:'Expenses'}
							]},
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsWindow')[5][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsWindow')[5][1], src:priv.model.prop('imgsWindow')[5][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span',class:PF +'caption6w',	C:'Marketing Dashboard'}
							]},
						]}
					]},
					{T:'section',class:'images ipad cf', id:'ipad', C:[
						{class:'heading',C:[
							{T:'a', href:'https://itunes.apple.com/us/app/Toucano/id604097486', C:
								{T:'span', C:'Get it from the Apple App Store'}
					},
							{T:'h3', class:PF + 'appStoretitle' , C:''}
						]},
						{T:'ul',class:'cf',	C :[
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsIpad')[0][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsIpad')[0][1], src:priv.model.prop('imgsIpad')[0][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span', class:PF +'caption1i', C:'Toucano Index -KPIs'}
							]},
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsIpad')[1][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsIpad')[1][1], src:priv.model.prop('imgsIpad')[1][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span', class:PF +'caption2i', C:'Toucano Index -Dashboards'}
							]},
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsIpad')[2][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsIpad')[2][1], src:priv.model.prop('imgsIpad')[2][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span', class:PF +'caption3i', C:'Toucano Index -Selected'}
							]},
							{T:'li',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsIpad')[3][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsIpad')[3][1], src:priv.model.prop('imgsIpad')[3][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span', class:PF +'caption4i', C:'Corporate Scorecard'}
							]}
						]},
						{T:'div',id:'breakline',C:''},
						{T:'ul', class:'cf',C:[
							{T:'li', class:'wide', C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsIpad')[4][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsIpad')[4][1], src:priv.model.prop('imgsIpad')[4][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span',  class:PF +'caption5i', C:'Expenses'}
							]},
							{T:'li',class:'wide',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsIpad')[5][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsIpad')[5][1], src:priv.model.prop('imgsIpad')[5][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span',  class:PF +'caption6i', C:'Marketing Dashboard'}
							]},
							{T:'li',class:'wide',C:[
								{T:'img','data-jslghtbx-caption':priv.model.prop('imgsIpad')[6][0], class:'jslghtbx-thmb', 'data-jslghtbx':priv.model.prop('imgsIpad')[6][1], src:priv.model.prop('imgsIpad')[6][2], 'data-jslghtbx-group':"mygroup1"},
								{T:'span',C:'Corporate Scorecard'}
							]}
						]}
					]}
				]
		},
			{T:'secion', id:'_dialogs'},

			{T:'a', href:"#top"}
		]);


		// Add edit handlers for editable fields
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
						if(!newVal){ newVal = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; }
						//console.log("setting model", k, " = ", newVal);
						priv.model.prop(k, newVal);
					}
				});
			});
		});




		priv.lightbox = priv.lightbox || new Lightbox();
		var lightBoxOptions = {
			// options
			boxId: false,
			dimensions: true,
			captions: true,
			hideCloseBtn: false,
			closeOnClick: true,
			loadingAnimation: 400,
			animElCount: 4,
			preload: true,
			carousel: true,
			animation: 200,
			nextOnClick: true,
			responsive: true,
			maxImgSize: 0.8,
			keyControl: true,
			prevImg: 'images/lightbox/prevlight.png',
			nextImg: 'images/lightbox/nextlight.png',
			// callbacks
			onopen: function(){
				// ...
			},
			onclose: function(){
				// ...
			},
			onload: function(){
				// ...
			},
			onresize: function(e){
				// ...
			},
			onloaderror: function(){
				// ...
			}
		};
		priv.lightbox.load(lightBoxOptions);
	};



	// Return constructor
	return ToucanoGalleryView;
}());



/**
 * The gallery section model.
 *
 * @class
 */
TCN.GalleryModel = (function(){

	// Create store for private properties
	var privates = TTk.Object.privateStore();

	// Constructor
	var GalleryModel = function(v, r){
		this.initModel(v, r);
	};

	// Defines the class name of this model, used to revive from JSON
	GalleryModel.CLASS = "TCN.GalleryModel";

	// Similar to defintion in TTk.Config
	GalleryModel.PROPS = {
		caption1: {t:'string', d:'Toucano Index -KPIs'},
		caption2: {t:'string', d:'Toucano Index -Dashboards'},
		caption3: {t:'string', d:'Toucano Index -Selected'},
		caption4: {t:'string', d:'Corporate Scorecard'},
		caption5: {t:'string', d:'Expenses'},
		caption6: {t:'string', d:'Marketing Dashboard'},

		getit   :{t:'string', d:'Get it from the Windows Store', l:'', e:''},
		windowtitle: {t:'string',d:'Toucano App On Windows 10'},
		appStoretitle: {t:'string',d:'Toucano App On Safari'},
		imgsWindow : {t:'array', d:[
									["Toucano Index -KPIs","images/visuals/viewer/01.png","images/thumbs/viewer/01.png"],
									["Toucano Index -Dashboards","images/visuals/viewer/02.png","images/thumbs/viewer/02.png"],
									["Toucano Index -Selected","images/visuals/viewer/03.png","images/thumbs/viewer/03.png"],
									["Corporate Scorecard","images/visuals/viewer/04.png","images/thumbs/viewer/04.png"],
									["Expenses","images/visuals/viewer/05.png","images/thumbs/viewer/05.png"],
									["Marketing Dashboard","images/visuals/viewer/06.png","images/thumbs/viewer/06.png"],
								]},
		imgsIpad : {t:'array', d:[
									["Toucano Index -KPIs","images/visuals/ipad/01.png","images/thumbs/ipad/01.png"],
									["Toucano Index -Dashboards","images/visuals/ipad/02.png","images/thumbs/ipad/02.png"],
									["Toucano Index -Selected","images/visuals/ipad/03.png","images/thumbs/ipad/03.png"],
									["Corporate Scorecard","images/visuals/ipad/04.png","images/thumbs/ipad/04.png"],
									["Expenses","images/visuals/ipad/05.png","images/thumbs/ipad/05.png"],
									["Marketing Dashboard","images/visuals/ipad/06.png","images/thumbs/ipad/06.png"],
									["Corporate Scorecard","images/visuals/ipad/07.png","images/thumbs/ipad/07.png"],
								]},
	};

	// Mixin TTk.Model
	TTk.Model.call(GalleryModel.prototype, privates);

	// Return constructor
	return GalleryModel;
}());


