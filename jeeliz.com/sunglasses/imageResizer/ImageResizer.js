var ImageResizer=(function(){
	var _isInitialized=false;
	var _cv0, _ctx0, _cv1, _ctx1, _cvs, _ctxs; //working canvas and context (only 2 required form mem opts)
	var _cv0tainted, _cv1tainted, _ctx0tainted, _ctx1tainted;

	var get_width=function(img){
		return (img.tagName==="IMG")?img.naturalWidth:img.width;
	};

	var get_height=function(img){
		return (img.tagName==="IMG")?img.naturalHeight:img.height;
	};

	var is_portrait=function(img){
		return get_height(img)>get_width(img);
	};

	var resize_recursive=function(targetWidth, sourceAspectRatio, cvi){ //should ne be called directly
		var nextCvi=(cvi+1)%2;
		var sourceCv=_cvs[cvi];
		var destCv=_cvs[nextCvi];
		var destCtx=_ctxs[nextCvi];

		if (sourceCv.width/targetWidth>2){
			destCv.width=Math.round(sourceCv.width/2);
			destCv.height=Math.round(sourceCv.height/2);
			//void ctx.drawImage(image, dx, dy, dLargeur, dHauteur);
			destCtx.drawImage(sourceCv, 0,0, destCv.width, destCv.height);
			return resize_recursive(targetWidth, sourceAspectRatio, nextCvi);
		} else {
			destCv.width=targetWidth;
			destCv.height=Math.round(targetWidth*sourceAspectRatio);
			destCtx.drawImage(sourceCv, 0,0, destCv.width, destCv.height);
			return destCv;
		}
	}; //end resize_recursiveInit()

	var resize_recursiveInit=function(targetWidth){ //resize _cv0 from its size to the targeWidth. keep the aspect ratio and returns the resized canvas
		return resize_recursive(targetWidth, _cvs[0].height/_cvs[0].width, 0);
	}

	var copy_imageToCv=function(baseImage, cvi){
		_cvs[cvi].width=get_width(baseImage);
		_cvs[cvi].height=get_height(baseImage);
		_ctxs[cvi].drawImage(baseImage, 0,0);	
	};

	var that={
		init: function(){
			_isInitialized=true;
			_cv0=document.createElement('canvas');
			_ctx0=_cv0.getContext('2d');
			_cv1=document.createElement('canvas');
			_ctx1=_cv1.getContext('2d');
			_cv0tainted=document.createElement('canvas');
			_ctx0tainted=_cv0tainted.getContext('2d');
			_cv1tainted=document.createElement('canvas');
			_ctx1tainted=_cv1tainted.getContext('2d');
			_cvs=[_cv0, _cv1];
			_ctxs=[_ctx0, _ctx1];
		}, //end init()

		set_tainted: function(){
			if (!_isInitialized){
				that.init();
			}
			_cvs[0]=_cv0tainted;
			_cvs[1]=_cv1tainted;
			_ctxs[0]=_ctx0tainted
			_ctxs[1]=_ctx1tainted;
		},

		unset_tainted: function(){
			_cvs[0]=_cv0;
			_cvs[1]=_cv1;
			_ctxs[0]=_ctx0
			_ctxs[1]=_ctx1;
		},

		clone: function(imgOrCanvas){
			var clonedCanvas=document.createElement('canvas');
			clonedCanvas.width=imgOrCanvas.width;
			clonedCanvas.height=imgOrCanvas.height;
			var  clonedCtx=clonedCanvas.getContext('2d');
			clonedCtx.drawImage(imgOrCanvas, 0,0);
			return clonedCanvas;
		},

		resize_andCrop: function(baseImage, width, height){ //crop either top and bottom, either left and right to fit to the new aspect ratio and resize
			if (!_isInitialized){
				that.init();
			}

			var sourceAspectRatio=get_width(baseImage)/get_height(baseImage);
			var targetAspectRatio=width/height;

			var sx, sy, sWidth, sHeight;

			if (sourceAspectRatio>targetAspectRatio){ //base image is more landscape than target image -> crop left and right
				sy=0;
				sHeight=get_height(baseImage);
				sWidth=Math.round(sHeight*targetAspectRatio);
				sx=Math.round((get_width(baseImage)-sWidth)/2);
			} else { //base image is more portrait tan target image -> crop top and bottom
				sx=0;
				sWidth=get_width(baseImage);
				sHeight=Math.round(sWidth/targetAspectRatio);
				sy=Math.round((get_height(baseImage)-sHeight)/2);
			}

			//drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur);
			_cvs[0].width=sWidth;
			_cvs[0].height=sHeight;
			_ctxs[0].drawImage(baseImage, sx, sy, sWidth, sHeight, 0,0, sWidth, sHeight);

			return resize_recursiveInit(width);
		}, //end resize_andCrop()

		resize_andCropNew: function(baseImage, width, height){ //same as resize_andCropNew but instantiate a new image
			if (!_isInitialized){
				that.init();
			}
			return that.clone(that.resize_andCrop(baseImage, width, height));
		},

		resize_width: function(baseImage, width){ //resize and keep aspect ratio
			if (!_isInitialized){
				that.init();
			}

			copy_imageToCv(baseImage, 0);
			return resize_recursiveInit(width);
		}, //end resize_width()

		resize_widthNew: function(baseImage, width){
			if (!_isInitialized){
				that.init();
			}
			return that.clone(that.resize_width(baseImage, width));
		},

		resize_maxDim: function(baseImage, maxDim){ //the maximum dimension (width or height of the resized image) is maxDim
			if (!_isInitialized){
				that.init();
			}

			var width=maxDim;
			if (get_height(baseImage)>get_width(baseImage)){ //portrait : maxDim is height
				width=Math.round(get_width(baseImage)*maxDim/get_height(baseImage));
			}

			copy_imageToCv(baseImage, 0);
			return resize_recursiveInit(width);
		}, //end resize_maxDim()

		resize_maxDimNew: function(baseImage, maxDim){
			if (!_isInitialized){
				that.init();
			}
			return that.clone(that.resize_maxDim(baseImage, maxDim));
		},

		resize_squareIfLandscape: function(baseImage, size){
			if (is_portrait(baseImage)){
				return that.resize_width(baseImage, size);
			} else {
				return that.resize_square(baseImage, size);
			}
		},

		resize_squareIfLandscapeNew: function(baseImage, size){
			if (!_isInitialized){
				that.init();
			}
			return that.clone(that.resize_squareIfLandscape(baseImage, size));
		},

		resize_square: function(baseImage, size){
			if (!_isInitialized){
				that.init();
			}

			//crop baseImage to a square and put result in cv0
			var  sx, sy, baseSize;
			if (get_width(baseImage)>get_height(baseImage)){ //landscape
				sy=0;
				sx=Math.round((get_width(baseImage)-get_height(baseImage))/2);
				baseSize=get_height(baseImage);
			} else { //portrait
				sx=0;
				sy=Math.round((get_height(baseImage)-get_width(baseImage))/2);
				baseSize=get_width(baseImage);
			}


			//drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur);
			_cvs[0].width=baseSize;
			_cvs[0].height=baseSize;
			_ctxs[0].drawImage(baseImage, sx, sy, baseSize, baseSize, 0,0,baseSize, baseSize);
			//document.body.appendChild(_cv0); return;

			return resize_recursiveInit(size);
		}, //end resize_square()

		resize_squareNew: function(baseImage, size){
			if (!_isInitialized){
				that.init();
			}
			return that.clone(that.resize_square(baseImage, size));
		}
	}; //end that

	return that;
})();
