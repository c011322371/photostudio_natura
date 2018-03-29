var CREATE_TOP_THUMBNAIL = {
  load: function () {
    $.ajax({
      url: "/src/json/topthumb.json",
      type: 'GET',
      dataType: 'json',
      cache: false
    }).then(
      $.proxy(this.init, this)
    ).catch(function () {
      console.log('error');
    })
  },
  init: function (data) {
    this.jsonData = data;
    this.setParameters();
    this.bindEvent();
  },
  setParameters: function () {
    this.thumbList = $('.jsc-nav-list');
    this.thumbItems = this.thumbList.children('li');
  },
  bindEvent: function () {
    // topのnavのcassettesを作成
    this.createCassettes();
    this.kvAnimation();
  },
  createCassettes: function () {
    var fragment = document.createDocumentFragment();
    this.$template = this.thumbItems.detach();

    for (var i = 0; i < this.jsonData.length; i++) {
      this.$cassette = this.$template.clone();
      this.$cassette.css({ 'background-image': "url(" + this.jsonData[i].img + ")" });
      this.$cassette.find('a').attr("href", this.jsonData[i].href);
      if (this.$cassette.find('p').length) this.$cassette.find('p').html(this.jsonData[i].description);
      fragment.appendChild(this.$cassette.get(0));
    }
    this.thumbList.get(0).appendChild(fragment);
  },
  kvAnimation: function () {
    // casettesを生成したため、変数ではなく再取得するような記述をしている
    console.log($('.jsc-top-nav-list li'));
    $('.jsc-top-nav-list li').each(function (index) {
      console.log($(this));
      $(this).delay(150 * index).fadeTo(1000, 1);
    });
  }
}

var MODAL_MANAGER = {
  init: function () {
    this.setParameters();
    this.bindEvent();
  },
  setParameters: function () {
    this.$body = $('body');
    this.$modalTrigger = $('.jsc-modal-trigger');
    this.$modalContents = $('.jsc-modal-contents');
  },
  bindEvent: function () {
    var myself = this;

    this.$modalTrigger.on('click', $.proxy(function (e) {
      this.showModal();
    }, this));

    this.$modalContents.on('click', $.proxy(function () {
      this.hideModal();
    }, this));
  },
  showModal: function () {
    this.$modalContents.fadeIn();
    this.$body.css({ overflow: "hidden" });
  },
  hideModal: function () {
    this.$modalContents.fadeOut();
    this.$body.css({ overflow: "auto" });
  }
};

$(function () {
  CREATE_TOP_THUMBNAIL.load();
  MODAL_MANAGER.init();
});
