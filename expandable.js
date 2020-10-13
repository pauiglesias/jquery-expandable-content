
(function ($) {

	$.fn.expandable = function(options) {

		// Merge with defaults
		const settings = $.extend({

			// Behavior
			expand				: this.hasClass('expandable-source-collapsed'),

			// Height
			height				: this.data('expandable-height') || '250px',

			// Check min height
			heightCheck			: (this.data('expandable-height-check') !== false),

			// Animations
			collapseDuration	: this.data('expandable-collapse-duration')   || '.25s',
			collapseAnimation	: this.data('expandable-collapse-animation')  || 'ease-out',
			expansionDuration	: this.data('expandable-expansion-duration')  || '.50s',
			expansionAnimation	: this.data('expandable-expansion-animation') || 'ease-out',

			// Media restriction
			mediaQuery			: this.data('expandable-media-query') || false,

		}, options);

		// Triggers for this source
		const id = $(this).data('expandable-id');
		const $triggers = $('.expandable-trigger[data-expandable-target="' + id + '"]');

		// Media query exception
		if (!settings.expand && settings.mediaQuery && window.matchMedia) {
			if (!window.matchMedia(settings.mediaQuery).matches) {
				$triggers.each(function() {
					$(this).css('cssText', 'display:none!important');
				});
				return this;
			}
		}

		// Set default styles
		this.css('height', 'auto');
		this.css('overflow', 'hidden');

		// Handle more text
		$triggers.each(function() {
			const textTag  = $(this).data('expandable-html-tag') || 'span';
			const textMore = $(this).attr('data-expandable-html-more');
			const textLess = $(this).data('expandable-html-less');
			if (!textMore) {
				const innerElements = $(this).find(textTag);
				if (innerElements && innerElements.length) {
					$(this).attr('data-expandable-html-more', $(innerElements[0]).html());
				}
			}
		});

		// Collapse
		if (!settings.expand) {

			if (settings.heightCheck && this[0].scrollHeight <= parseInt(settings.height)) {
				this.addClass('expandable-source-none').removeClass(['expandable-source-collapsed', 'expandable-source-expanded']);
				$triggers.each(function() {
					$(this).css('cssText', 'display:none!important');
					$(this).addClass('expandable-trigger-none').removeClass(['expandable-trigger-collapsed', 'expandable-trigger-expanded']);
				});
				return this;
			}

			this.css('transition', (settings.collapseDuration && settings.collapseAnimation) ? 'max-height ' + settings.collapseDuration + ' ' + settings.collapseAnimation : '');
			this.css('max-height', settings.height);
			this.addClass('expandable-source-collapsed').removeClass(['expandable-source-expanded', 'expandable-source-none']);
			$triggers.each(function() {
				$(this).css('display', '');
				$(this).html($(this).data('expandable-html-more'));
				$(this).addClass('expandable-trigger-collapsed').removeClass(['expandable-trigger-expanded', 'expandable-trigger-none']);
			});

		// Expand
		} else {
			this.css('transition', (settings.expansionDuration && settings.expansionAnimation) ? 'max-height ' + settings.expansionDuration + ' ' + settings.expansionAnimation : '');
			this.css('max-height', this[0].scrollHeight + 'px');
			this.removeClass(['expandable-source-collapsed', 'expandable-source-none']).addClass('expandable-source-expanded');
			$triggers.each(function() {
				$(this).css('display', '');
				$(this).html($(this).data('expandable-html-less'));
				$(this).removeClass(['expandable-trigger-collapsed', 'expandable-trigger-none']).addClass('expandable-trigger-expanded');
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