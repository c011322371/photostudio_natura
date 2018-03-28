var CREATE_THUMB = {
  load: function () {
    $.ajax({
      url: "/src/json/subthumb.json",
      type: 'GET',
      dataType: 'json',
      cache: false
    }).then($.proxy(function (json) {
      var pageName = $("body").attr("id");
      for (var i = 0; i < json.length; i++) {
        if (json[i].page === pageName) {
          this.init(json[i]);
        }
      }
    }, this)).catch(function () {
      console.log('error');
    })
  },
  init: function (json) {
    this.imgPath = json.img;
    this.setParameters();
    this.bindEvent();
  },
  setParameters: function () {
    this.$previewContainer = $('.jsc-gallery-preview');
    this.$thumbContainer = $('.jsc-gallery-thumb');
  },
  bindEvent: function () {
    this.createThumb();
    this.createPreview();
    this.$thumbList.on('click', $.proxy(this.applyPreview, this));
  },
  createThumb: function () {
    var thumbCassettes = this.createCassettes();
    this.$thumbContainer.get(0).appendChild(thumbCassettes);
    // set created thumblist
    this.$thumbList = this.$thumbContainer.children('li');
  },
  createPreview: function () {
    var previewCassettes = this.createCassettes();
    this.$previewContainer.get(0).appendChild(previewCassettes);
    // set created previewlist
    this.$previewList = this.$previewContainer.children('li');
  },
  createCassettes: function () {
    var $li = $("<li />"),
      fragment = document.createDocumentFragment();

    for (var i = 0; i < this.imgPath.length; i++) {
      var $cassette = $li.clone();
      $cassette.css({ 'background-image': "url(" + this.imgPath[i] + ")" });

      fragment.appendChild($cassette.get(0));
    }
    return fragment;
  },
  applyPreview: function (e) {
    var index = $(e.target).index(),
      ANIMATION_SPEED = 800;
    this.$previewList.fadeOut(ANIMATION_SPEED);
    this.$previewList.eq(index).fadeIn(ANIMATION_SPEED);
    return false;
  }
};

var TOGGLE_NAV_MENU = {
  init: function () {
    this.setParameters();
    this.bindEvent();
  },
  setParameters: function () {
    this.$navIcon = $('.jsc-nav-icon');
    this.$navList = $('.jsc-nav-wrap');
  },
  bindEvent: function () {
    this.$navIcon.on('click', $.proxy(this.toggleNavMenu, this));
  },
  toggleNavMenu: function () {
    this.$navList.fadeToggle()
  }
};

$(function () {
  CREATE_THUMB.load();
  TOGGLE_NAV_MENU.init();
});
