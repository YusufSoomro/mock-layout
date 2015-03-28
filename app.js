(function() {
  if (typeof MockLayout === "undefined") {
    window.MockLayout = {}
  }

  var TABS = MockLayout.TABS = [".book-info", ".avail-formats", ".rel-courses"];

  var currentTab = MockLayout.currentTab = MockLayout.TABS[0];

  MockLayout.initialize = function() {
    for (var i = 0; i < TABS.length; i++) {
      $(TABS[i]).css("display", "none");
    }

    $(currentTab).css("display", "block");
    $(currentTab + "-tab").css("background-color", "white");

    MockLayout.bindEvents();
  };

  MockLayout.bindEvents = function() {
    $(".tabs").on("click", "span", MockLayout.switchTab);
    $(".select-all").on("click", MockLayout.toggleSelects);

    $(".show-more-less").on("click", {
      anchorString: '.book-content .show-more-less',
      container: '.book-content'
    }, MockLayout.showMoreLess);

    $(".show-more-less-discl").on("click", {
      anchorString: '.rel-courses-content .show-more-less-discl',
      container: '.rel-courses-content'
    }, MockLayout.showMoreLess);
  };

  MockLayout.switchTab = function(event) {
    $(currentTab).css("display", "none");
    $(currentTab + "-tab").css("background-color", "#E0E0E0");

    var newTabName = $(event.currentTarget);
    var newTabText = newTabName.attr("class").slice(0, newTabName.length - 5);
    var newTab = "." + newTabText;

    currentTab = newTab;
    $(currentTab).css("display", "block");
    $(currentTab + "-tab").css("background-color", "white");
  };

  MockLayout.toggleSelects = function(event) {
    if ($(event.currentTarget).attr("checked")) {
      $(".checkbox-box").attr("checked", false);
      $(".checkbox-box").prop("checked", false);
    } else {
      $(".checkbox-box").attr("checked", true);
      $(".checkbox-box").prop("checked", true);
    }
  };

  MockLayout.showMoreLess = function(event) {
    event.preventDefault();
    var $parent = $(event.currentTarget).closest(event.data.container);
    var $firstP;
    var $lastP;
    var $showMoreAnchor;
    var $shown = $parent.find('.shown');

    if ($shown.length > 0) {

      $shown
        .addClass('hideable')
        .slideUp("slow", function(){
          $firstP = $parent.find('p').first();
          $showMoreAnchor = $(event.data.anchorString);
          $showMoreAnchor.text("..Show more");
          $showMoreAnchor.appendTo($firstP);
        })
        .removeClass('shown');
    } else {
      $parent.find('.hideable')
        .addClass('shown')
        .slideDown("slow")
        .removeClass('hideable');

      $lastP = $parent.find('p').last();
      $showMoreAnchor = $(event.data.anchorString);
      $showMoreAnchor.text("..Show less");
      $showMoreAnchor.appendTo($lastP);
    }
  };
})();
