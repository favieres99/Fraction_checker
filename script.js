$(document).ready(() => {
	$('.random').on('click', () => {
		generateRandom();
		$('#random-fraction').text(_randFraction);
	});

	// Generates random irreducible fractions
	let _randDen;
	let _randNum;
	let _randFraction;
	function generateRandom() {
		_randDen = Math.floor(Math.random() * (10 - 2) + 2);
		_randNum = Math.floor(Math.random() * (_randDen - 1) + 1);
		if (gcd_two_numbers(_randNum, _randDen) != 1)
			generateRandom();
		else
			_randFraction = _randNum + '/' + _randDen;
	}

	// Greatest common divisor in between two numbers
	function gcd_two_numbers(x, y) {
		while(y) {
			let t = y;
			y = x % y;
			x = t;
		}
		return x;
	}

	// Changes fraction through button clicks
	let _den = 2;
	let _num = 1;
	function new_fraction(index) {
		if ((_den == 1 && index == 2) || (_num == 1 && index == 4) || (_num == _den && index == 3)) {
			_num = 1;
			_den = 2;
			return 0;
		}
		switch (index) {
			case 1:
				_den++;
				return 1;
			case 2:
				_den--;
				return 1;
			case 3:
				_num++;
				return 1;
			case 4:
				_num--;
				return 1;
			default:
				console.log('not working');
		};
	}

	const $addDen = $('.add-den');
	const $subDen = $('.sub-den');
	const $addNum = $('.add-num');
	const $subNum = $('.sub-num');

	$addDen.on('click', function() {btnClick(1);});
	$subDen.on('click', function() {btnClick(2);});
	$addNum.on('click', function() {btnClick(3);});
	$subNum.on('click', function() {btnClick(4);});

	// Draws rectangle
	function btnClick(index) {
		let response = new_fraction(index);
		$('#message').text((response) ? _num + '/' + _den : 'Not valid fraction');
		$('.full').css({width: (400 / _den) * _num});
		$('#full-rectangle').removeClass('hidden');
	}

	//Checks rectangle
	$('.checker').on('click', () => {
		if (_randNum / _randDen == _num / _den) {
			
			$('.full').css({backgroundColor: '#0F0'}).animate({
				height: 210,
				width: ((400 / _den) * _num * 0.2) + (400 / _den) * _num
			}, function() {
				$('.full').css({
					backgroundColor: '#000',
					height: 200,
					width: (400 / _den) * _num
				});
			});
		}
		else
			$('.full').css({backgroundColor: '#F00'}).shake();
	})

	// Shake function + return to value before
	jQuery.fn.shake = function(interval,distance,times){
		interval = typeof interval == "undefined" ? 100 : interval;
		distance = typeof distance == "undefined" ? 10 : distance;
		times = typeof times == "undefined" ? 3 : times;
		var jTarget = $(this);
		jTarget.css('position','relative');
		for(var iter=0;iter<(times+1);iter++){
		   jTarget.animate({ left: ((iter%2==0 ? distance : distance*-1))}, interval);
		}
		return jTarget.animate({ left: 0},interval, function() {
			$('.full').css({
				backgroundColor: '#000',
				height: 200,
				width: (400 / _den) * _num
			});
		});
	 }
});