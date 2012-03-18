// $Id: tableheader.js,v 1.32 2010/07/28 01:38:28 dries Exp $
(function ($) {

/**
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    // Resize header and its cell widths.
    this.stickyHeaderCells.each(function (index) {
      var cellWidth = self.originalHeaderCells.eq(index).css('width');
      // Exception for IE7.
      if (cellWidth == 'auto') {
        cellWidth = self.originalHeaderCells.get(index).clientWidth + 'px';
      }
      $(this).css('width', cellWidth);
    });
    this.stickyTable.css('width', this.originalTable.css('width'));
  }
};

})(jQuery);
;
// $Id: mollom.admin.js,v 1.2 2010/10/13 00:18:52 dries Exp $
(function ($) {

/**
 * Filters blacklist entries.
 */
Drupal.behaviors.mollomBlacklistFilter = {
  attach: function (context) {
    var self = this;
    $('#mollom-blacklist', context).once('mollom-blacklist-filter', function () {
      // Prepare a list of all entries to optimize performance. Each key is a
      // blacklisted text and each value is an object containing the
      // corresponding table row, context, and match.
      self.entries = {};
      $(this).find('tr:has(.mollom-blacklist-text)').each(function () {
        var $row = $(this);
        self.entries[$row.find('.mollom-blacklist-text').text()] = {
          context: $row.children('.mollom-blacklist-context').attr('class').match(/value-(\w+)/)[1],
          match: $row.children('.mollom-blacklist-match').attr('class').match(/value-(\w+)/)[1],
          row: $row.get(0)
        };
      });

      // Attach the instant text filtering behavior.
      var $filterText = $('#mollom-blacklist-filter-text', context);
      var $filterContext = $('#mollom-blacklist-filter-context', context);
      var $filterMatch = $('#mollom-blacklist-filter-match', context);

      self.lastSearch = {};
      var filterRows = function () {
        // Prepare static variables and conditions only once.
        var i, text, visible, changed;
        var search = {
          // Blacklist entries are stored in lowercase, so to get any filter
          // results, the entered text must be converted to lowercase, too.
          text: $filterText.val().toLowerCase(),
          context: $filterContext.val(),
          match: $filterMatch.val()
        };
        // Immediately cancel processing if search values did not change.
        changed = false;
        for (i in search) {
          if (search[i] != self.lastSearch[i]) {
            changed = true;
            break;
          }
        }
        if (!changed) {
          return;
        }
        self.lastSearch = search;
        // Blacklists can contain thousands of entries, so we use a simple
        // for...in loop instead of jQuery.each() to save many function calls.
        // Likewise, we directly apply the 'display' style, since
        // jQuery.fn.hide() and jQuery.fn.show() call into jQuery.fn.animate(),
        // which is useless for this purpose.
        for (text in self.entries) {
          visible = (search.text.length == 0 || text.indexOf(search.text) != -1);
          visible = visible && (search.context.length == 0 || self.entries[text].context == search.context);
          visible = visible && (search.match.length == 0 || self.entries[text].match == search.match);
          if (visible) {
            self.entries[text].row.style.display = '';
          }
          else {
            self.entries[text].row.style.display = 'none';
          }
        }
      };
      $filterText.bind('keyup change', filterRows);
      $filterContext.change(filterRows);
      $filterMatch.change(filterRows);
    });
  }
};

})(jQuery);
;
