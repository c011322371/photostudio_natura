var SP_TOGGLE_NAV_MENU = {
  init: function () {
    this.setParameters();
    this.bindEvent();
  },
  setParameters: function () {
    this.$spNavTrigger = $('.jsc-sp-nav');
    this.$linkList = $('.jsc-link-list');
    this.$backFilter = $('.jsc-back-filter');
  },
  bindEvent: function () {
    this.$spNavTrigger.on('click', $.proxy(function () {
      this.$spNavTrigger.toggleClass('isOpen');
      this.$linkList.slideToggle();
      this.$backFilter.fadeToggle();
    }, this));
  }
};

$(function () {
  SP_TOGGLE_NAV_MENU.init();
});
