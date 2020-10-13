
(function ($) {

	$.fn.expandable = function(options) {

		const settings = $.extend({
			expanded: !this.hasClass('expandable-source-collapsed'),
			maxHeight: this.data('expandable-height') || '250px',
			collapseDuration: this.data('expandable-collapse-duration') || '.35s',
			collapseAnimation: this.data('expandable-collapse-animation') || 'ease-out',
			expansionDuration: this.data('expandable-expansion-duration') || '2.50s',
			expansionAnimation: this.data('expandable-expansion-animation') || 'ease-out'
		}, options);

		const id = $(this).data('expandable-id');
		const $triggers = $('.expandable-trigger[data-expandable-target="' + id + '"]');

		this.css('height', 'auto');
		this.css('overflow', 'hidden');

		// Collapse
		if (settings.expanded) {
			this.css('max-height', settings.maxHeight);
			this.css('transition', 'max-height ' + settings.collapseDuration + ' ' + settings.collapseAnimation);
			this.addClass('expandable-source-collapsed').removeClass('expandable-source-expanded');
			$triggers.each(function() {
				$(this).addClass('expandable-trigger-collapsed').removeClass('expandable-trigger-expanded');
			});

		// Expand
		} else {
			this.css('transition', 'max-height ' + settings.expansionDuration + ' ' + settings.expansionAnimation);
			this.css('max-height', this[0].scrollHeight + 'px');
			this.removeClass('expandable-source-collapsed').addClass('expandable-source-expanded');
			$triggers.each(function() {
				$(this).removeClass('expandable-trigger-collapsed').addClass('expandable-trigger-expanded');
			});
		}

		return this;
    };

	$('.expandable-source').each(function() {
		const autostart = $(this).data('expandable-autostart');
		if (('boolean' == typeof autostart && autostart) || 'boolean' != typeof autostart) {
			$(this).expandable();
		}
	});

	$('.expandable-trigger').click(function() {
		const target = $(this).data('expandable-target');
		if (target) {
			$('.expandable-source[data-expandable-id="' + target + '"]').each(function() {
				$(this).expandable();
			});
		}
		return false;
	});

}(jQuery));