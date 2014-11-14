(function($) {
	$.fn.nicefileinput = function(options) {
		var settings = {
			label : 'Browse...', // Default button text
			fullPath: false,
			callback : false
		};
		if(options) { $.extend(settings, options); };

		return this.each(function() {
			var self = this;

			if ($(self).attr('data-styled') === undefined) {

				var r = Math.round(Math.random() * 10000);
				var d = new Date();
				var guid = d.getTime() + r.toString();

				var filename = $('<span/>')
					.css({
						'display': 'block',
						'float': 'left',
						'margin': 0,
						'padding': '0 5px'
					})
					.addClass('NFI-filename NFI' + guid);
				var wrapper = $("<div>")
					.css({
						'overflow': 'hidden',
						'position': 'relative',
						'display': 'block',
						'float': 'left',
						'white-space': 'nowrap',
						'text-align': 'center'
					})
					.addClass('NFI-button NFI' + guid)
					.html('<span class="NFI-label">'+settings.label+'</span>');


				if (typeof settings.callback != 'function') {
					$(self).before(filename);
				}
				$(self).wrap(wrapper);

				$('.NFI'+guid).wrapAll('<div class="NFI-wrapper" id="NFI-wrapper-'+guid+'" />');
				$('.NFI-wrapper').css({
					'overflow': 'auto',
					'display': 'inline-block'
				});
				$("#NFI-wrapper-"+guid).addClass($(self).attr("class"));

				$(self)
					.css({
						'opacity': 0,
						'position': 'absolute',
						'border': 'none',
						'margin': 0,
						'padding': 0,
						'top': 0,
						'right': 0,
						'cursor': 'pointer',
						'height': '60px'
					})
					.addClass('NFI-current');
				$(self).on("change", function() {
					var fullPath = $(self).val();
					var filename_tmp;
					if (settings.fullPath) {
						filename_tmp = fullPath;
					} else {
						var pathArray = fullPath.split(/[/\\]/);
						filename_tmp =  pathArray[pathArray.length - 1];
					}

					if (typeof settings.callback != 'function') {
						filename.text(filename_tmp);
					} else {
						settings.callback(filename_tmp, $('.NFI'+guid));
					}

				});
				$(self).attr('data-styled', true);
			}
		});

	};
})(jQuery);