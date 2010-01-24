(function($) {
	
	$.fn.slidingLabels = function(options) {
		
		options = $.extend({}, $.fn.slidingLabels.defaults, options);
		
		var cssIn = cssOut = {
			position: 'relative'
		};
		
		var adjustLeft = 10, adjustTop = 13;
		
		var current, prev = 0;
		
		return this.each(function() {
			
			var self = $(this);
			var labels = self.find('label');
			
			cssIn.opacity = 0.6;

			labels.each(function(i, label) {
				
				switch(options.direction) {
					case 'vertical':
						cssIn.top = $(label).height() + adjustTop;
						break;
					case 'horizontal':
						cssIn.left = $(label).width() + adjustLeft;
						break;
					default:
				}
				
				$(label).css(cssIn);
			});
			
			self.find('input[type=text]').each(function(i, input) {
				
				$(input)
					.focusin(function() {
						
						cssOut.opacity = 1;
						
						switch(options.direction) {
							case 'horizontal':
								cssOut.left = 0;
								cssOut.top = 0;
								break;
							case 'vertical':
								cssOut.top = 0;
								break;
							default:
						}
						
						$(labels[i]).animate(cssOut);
						current = i;
					})
					.focusout(function() {
						
						switch(options.direction) {
							case 'horizontal':
		
								if(!jQuery.trim($(input).val())) {
									cssIn.opacity = 0.6;
									cssIn.left = $(labels[current]).width() + adjustLeft;
								}
								else {
									cssIn.left = 0;
									cssIn.opacity = 1;
								}
								break;
							case 'vertical':
								if(!jQuery.trim($(input).val())) {
									cssIn.opacity = 0.6;
									cssIn.top = $(labels[current]).height() + adjustTop;
								}
								else {
									cssIn.top = 0;
									cssIn.opacity = 1;
								}
								break;
							default:
						}
						
						$(labels[current]).animate(cssIn);
					});
			});
			
			
		});
	};
	
	$.fn.slidingLabels.defaults = {
		direction:'horizontal'
	};
	
})(jQuery);