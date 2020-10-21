document.writeln("<style>");
document.writeln(".mainbox{");
document.writeln("    overflow:hidden;");
document.writeln("    position:relative;");
document.writeln("}");
document.writeln(".flashbox{");
document.writeln("   overflow:hidden;");
document.writeln("    position:relative;");
document.writeln("}");
document.writeln(".imagebox{");
document.writeln("    text-align:right;position:relative;z-index:999;");
document.writeln("}");
document.writeln("");
document.writeln(".bitdiv{display:inline-block;width:18px;height:18px;margin:0 10px 10px 0px;cursor:pointer;float:right;}");
document.writeln(".defimg{background-image:url(\/images\/02.png)}");
document.writeln(".curimg{background-image:url(\/images\/01.png)}");
document.writeln("<\/style>")

document.writeln("<div id=\"xxx\"  >");
 function PPTBox()
    {
        this.uid = PPTBoxHelper.getId();
        PPTBoxHelper.instance[this.uid] = this;
        this._$ = function(id){return document.getElementById(id);};
        this.width = 332;//宽度
        this.height = 227;//高度
        this.picWidth = 15;//小图宽度
        this.picHeight = 12;//小图高度
        this.autoplayer = 4;//自动播放间隔（秒）
        this.target = "_blank";
        this._box = [];
        this._curIndex = 0;
    }
    PPTBox.prototype =
    {
        _createMainBox : function (){
            var flashBoxWidth = this.width * this._box.length + 5;
            var html="<div id='"+this.uid+"_mainbox' class='mainbox'  style='width:"+(this.width)+"px;height:"+(this.height+2)+"px;'>";
            html += "<div id='"+this.uid+"_flashbox' class='flashbox' style='width:"+flashBoxWidth+"px;height:"+(this.height+2)+"px;'></div>";
            html += "<div id='"+this.uid+"_imagebox' class='imagebox' style='width:"+this.width+"px;height:"+(this.picHeight+2)+"px;top:-"+(this.picHeight+20)+"px;'></div>";
            html += "</div>";
            document.write(html);
        },
        _init : function (){
            var picstyle= "";
            var eventstr = "PPTBoxHelper.instance['"+this.uid+"']";
            var imageHTML="";
            var flashbox = "";
            for(var i=0;i<this._box.length;i++){
                var parame = this._box[i];
                flashbox += this.flashHTML(parame.url,this.width,this.height,i);
                imageHTML ="<div class='bitdiv "+((i==0)?"curimg":"defimg")+"' title ="+parame.title+" src='bit01.gif' "+picstyle+" onclick = \""+eventstr+".clickPic("+i+")\"  onmouseover=\""+eventstr+".mouseoverPic("+i+")\"></div>" + imageHTML;
            }
            this._$(this.uid+"_flashbox").innerHTML = flashbox;
            this._$(this.uid+"_imagebox").innerHTML = imageHTML;

        },
        _play : function(){
            clearInterval(this._autoplay);
            var idx = this._curIndex+1;
            if(idx>=this._box.length){idx=0;}
            this.changeIndex(idx);
            var eventstr = "PPTBoxHelper.instance['"+this.uid+"']._play()";
            this._autoplay = setInterval(eventstr,this.autoplayer*1000);

        },
        flashHTML : function(url,width,height,idx) {
            var isFlash = url.substring(url.lastIndexOf('.')+1).toLowerCase()=="swf";
            var html = "";
            if(isFlash){
                html = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' "
                + "codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width='"+width+"' height='"+height+"'>"
                + "<param name=\"movie\" value=\""+url+"\" />"
                + "<param name='quality' value='high' />"
                + "<param name='wmode' value='transparent'>"
                + "<embed src='"+url+"' quality='high' wmode='opaque' pluginspage='http://www.macromedia.com/go/getflashplayer'"
                +"  type='application/x-shockwave-flash' width="+width+" height='"+height+"'></embed>"
                +"  </object>";
            } else {
                var eventstr = "PPTBoxHelper.instance['"+this.uid+"']";
                var style = "";
                if(this._box[idx].href){
                    style = "cursor:pointer"
                }
                html="<img src='"+url+"' style='width:"+width+"px;height:"+height+"px;"+style+"' onclick = \""+eventstr+".clickPic("+idx+")\"/>";
            }
            return html;
        },
        changeIndex : function(idx){
            var parame = this._box[idx];
            moveElement(this.uid+"_flashbox",-(idx*this.width),1);
            var imgs = this._$(this.uid+"_imagebox").getElementsByTagName("div");
            imgs[this._box.length-1-this._curIndex].className = "bitdiv defimg";
            imgs[this._box.length-1-idx].className = "bitdiv curimg";
            this._curIndex = idx;
        },
        mouseoverPic:function(idx){
            this.changeIndex(idx);

            if(this.autoplayer>0){
               clearInterval(this._autoplay);
               var eventstr = "PPTBoxHelper.instance['"+this.uid+"']._play()";
               this._autoplay = setInterval(eventstr,this.autoplayer*1000);
            }
        },
        clickPic:function(idx){
            var parame = this._box[idx];
            if(parame.href&&parame.href!=""){
                window.open(parame.href,this.target);
            }
        },
        add:function (imgParam){
            this._box[this._box.length] = imgParam;
        },
        show : function () {
           this._createMainBox();
           this._init();
           if(this.autoplayer>0){
               var eventstr = "PPTBoxHelper.instance['"+this.uid+"']._play()";
               this._autoplay = setInterval(eventstr,this.autoplayer*1000);
           }
        }
    }
    var PPTBoxHelper =
    {
        count: 0,
        instance: {},
        getId: function() { return '_ppt_box-' + (this.count++); }
    };

    function moveElement(elementID,final_x,interval) {
      if (!document.getElementById) return false;
      if (!document.getElementById(elementID)) return false;
      var elem = document.getElementById(elementID);
      if (elem.movement) {
        clearTimeout(elem.movement);
      }
      if (!elem.style.left) {
        elem.style.left = "0px";
      }
      var xpos = parseInt(elem.style.left);
      if (xpos == final_x ) {
            return true;
      }
      if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos)/5);
        xpos = xpos + dist;
      }
      if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x)/5);
        xpos = xpos - dist;
      }
      elem.style.left = xpos + "px";
      var repeat = "moveElement('"+elementID+"',"+final_x+","+interval+")";
      elem.movement = setTimeout(repeat,interval);
    }
	     var box =new PPTBox();
     box.width = 980; //宽度
     box.height = 330;//高度
     box.autoplayer = 5;//自动播放间隔时间

     //box.add({"url":"图片地址","title":"悬浮标题","href":"链接地址"})
     box.add({"url":"static/image/01.jpg","href":"","title":""})
     box.add({"url":"static/image/02.jpg","href":"","title":""})
     box.show();
document.writeln("<\/div>")