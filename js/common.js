var CREATE_TOP_THUMBNAIL = {
    load : function(){
        $.ajax({
            url : "/json/topthumb.json",
            type : 'GET',
            dataType : 'json',
            cache : false,
            success : $.proxy(this.init, this),
            error : function(xhr,textStatus,errorThrown){
                var res = {}
                try {
                    res = $.parseJSON(xhr.responseText);
                } catch (e) {
                }
                console.log(res.code || 'パース失敗');
                console.log(res.message || 'パース失敗');
            }
        })
    },
    init : function(data){
        this.jsonData = data;
        this.setParameters();
        this.createCassettes();
        this.setParameters();
        this.displayKvAnimation();
    },
    setParameters: function () {
        this.thumbList = $('.jsc-kv-container');
        this.thumbItems = this.thumbList.find('li');
        this.preview = $('.jsc-pg-preview');
    },
    createCassettes : function(){
        var fragment = document.createDocumentFragment();
        this.$template = this.thumbItems.detach();

        for(var i = 0; i < this.jsonData.length; i++){
            this.$cassette = this.$template.clone();
            this.$cassette.css({ 'background-image' : "url(" + this.jsonData[i].img + ")" });
            this.preview.eq(i).find('img').attr("src",this.jsonData[i].img);
            this.$cassette.find('a').attr("href" , this.jsonData[i].href);
            this.$cassette.find('p').html(this.jsonData[i].description);
            fragment.appendChild(this.$cassette.get(0));
        }
        this.thumbList.get(0).appendChild(fragment);
        //apend後にスムーススクロール実行
        OPARATION_SCROLL.init();
    },
    displayKvAnimation: function () {
        this.thumbItems.each(function (index) {
            $(this).delay(150*index).fadeTo(1000, 1);
        });
    }
}

var CREATE_PG_THUMBNAIL = {
    load : function(){
        $.ajax({
            url : "/json/pgthumb.json",
            type : 'GET',
            dataType : 'json',
            cache : false,
            success : $.proxy(this.init, this),
            error : function(xhr,textStatus,errorThrown){
                var res = {}
                try {
                    res = $.parseJSON(xhr.responseText);
                } catch (e) {
                }
                console.log(res.code || 'パース失敗');
                console.log(res.message || 'パース失敗');
            }
        })
    },
    init : function(data){
        this.jsonData = data;
        this.setParameters();
        this.createCassettes();
        this.setParameters();
        this.changePgPreview();
    },
    setParameters: function () {
        this.thumbList = $('.jsc-pg-list');
        this.thumbItems = this.thumbList.find('li');
        this.$thumbPreview = $('.jsc-pg-preview').find('img');
    },
    createCassettes : function(){
        var fragment = document.createDocumentFragment();
        this.$template = this.thumbItems.detach();
        for(var i = 0; i < this.jsonData.length; i++) {
            for (var j = 0; j < this.jsonData[i].length; j++) {
                this.$cassette = this.$template.clone();
                this.$cassette.css({'background-image': "url(" + this.jsonData[i][j].img + ")"});
                fragment.appendChild(this.$cassette.get(i));
            }
            this.thumbList.get(i).appendChild(fragment);
        }
        var myself = this;
        $('.jsc-grid-cut').each(function (a,e) {
            $(window).on('scroll', function(){
                if($(window).scrollTop()+ $(window).height()<$(e).offset().top){
                    return;
                }else{
                    myself.displayKvAnimation($(e));
                }
            })
        })
    },
    displayKvAnimation: function (e) {
        e.find('.jsc-pg-list li').each(function (index) {
            $(this).delay(150*index).fadeTo(1000, 1);
        });
        e.find('.jsc-pg-preview img').fadeIn(1000);
    },
    changePgPreview:function () {
        var myself = this;
        this.thumbItems.on('click',function () {
            var $thisItem = $(this),
                index = $thisItem.index(),
                pgcut = $thisItem.parents('.jsc-pg-cut'),
                pgcutIndex = pgcut.index()-1;

            pgcut.find('.jsc-pg-preview img').attr('src',myself.jsonData[pgcutIndex][index].img).hide().fadeIn(1000);
        })
    }
}

var OPARATION_SCROLL = {
    init: function () {
        this.setParameters();
        this.showTrackerMenu();
        this.smoothScroll();
    },
    setParameters: function () {
        this.window = $(window);
        this.gridCut = $('.jsc-grid-cut');
        this.trackMenu = $('.jsc-track-menu');
        this.cutLink = $('.jsc-track-link').find('a');
    },
    showTrackerMenu: function () {
        var myself = this;
        myself.gridCut.css({height: myself.window.height()});

        this.window.on('resize',function () {
            myself.gridCut.css({height: myself.window.height()});
        });

        this.window.on('scroll',function () {
            if(myself.gridCut.height()<=myself.window.scrollTop()){
                myself.trackMenu.fadeIn();
            }
            else{
                myself.trackMenu.fadeOut();
            }
        })
    },
    smoothScroll:function () {
        this.cutLink.on('click',function(e) {
            e.preventDefault();
            var speed = 1000;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $('body,html').animate({
                scrollTop:position
            }, speed, 'swing');
            return false;
        });
    }
}

var MODAL_MANAGER = {
    init: function(){
        this.setParameters();
        this.bindEvent();
    },
    setParameters: function(){
        this.$body = $('body');
        this.$modalTrigger = $('.jsc-modal-trigger');
        this.$modalContents = $('.jsc-modal-contents');
    },
    bindEvent: function(){
        var myself = this;

        this.$modalTrigger.on('click',function(e){
            e.preventDefault();
            myself.$modalContents.fadeIn();
            myself.$body.css({overflow:"hidden"});
        });

        this.$modalContents.on('click',function(){
            $(this).fadeOut();
            myself.$body.css({overflow:"auto"});
        });
    }
};

$(function(){
    CREATE_TOP_THUMBNAIL.load();
    CREATE_PG_THUMBNAIL.load();
    MODAL_MANAGER.init();
});
