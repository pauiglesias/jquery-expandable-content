
(function ($) {

	$.fn.expandable = function(options) {

		// Merge with defaults
		const settings = $.extend({

			// Behavior
			expand				: this.hasClass('expandable-source-collapsed'),

			// Height
			maxHeight			: this.data('expandable-height') || '250px',

			// Animations
			collapseDuration	: this.data('expandable-collapse-duration')   || '.25s',
			collapseAnimation	: this.data('expandable-collapse-animation')  || 'ease-out',
			expansionDuration	: this.data('expandable-expansion-duration')  || '.50s',
			expansionAnimation	: this.data('expandable-expansion-animation') || 'ease-out',

			// Media restriction
			mediaQuery			: this.data('expandable-media-query') || false,

		}, options);

		// Media query exception
		if (!settings.expand && settings.mediaQuery && window.matchMedia) {
			if (!window.matchMedia(settings.mediaQuery).matches) {
				return this;
			}
		}

		// Set default styles
		this.css('height', 'auto');
		this.css('overflow', 'hidden');

		// Check source triggers
		const id = $(this).data('expandable-id');
		const $triggers = $('.expandable-trigger[data-expandable-target="' + id + '"]');

		// Collapse
		if (!settings.expand) {
			this.css('transition', (settings.collapseDuration && settings.collapseAnimation) ? 'max-height ' + settings.collapseDuration + ' ' + settings.collapseAnimation : '');
			this.css('max-height', settings.maxHeight);
			this.addClass('expandable-source-collapsed').removeClass('expandable-source-expanded');
			$triggers.each(function() {
				$(this).addClass('expandable-trigger-collapsed').removeClass('expandable-trigger-expanded');
			});

		// Expand
		} else {
			this.css('transition', (settings.expansionDuration && settings.expansionAnimation) ? 'max-height ' + settings.expansionDuration + ' ' + settings.expansionAnimation : '');
			this.css('max-height', this[0].scrollHeight + 'px');
			this.removeClass('expandable-source-collapsed').addClass('expandable-source-expanded');
			$triggers.each(function() {
				$(this).removeClass('expandable-trigger-collapsed').addClass('expandable-trigger-expanded');
			});
		}

		// Done
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