window.bodyLoadEvent = function () {
	//if (window && document && document.body && document.body.innerHTML && document.getElementById) {
	window.rn = 16;
	window.dn = 16;
	var wp = 18, hp = 12;
	window.tmain = document.getElementById("main");
	window.tpal = document.getElementById("palette");
	window.csec = document.getElementById("sp");
	
	window.points = 150;
	window.prevPoints = 0;
	window.ccos = 100;
	
	window.Stats = function (cost, pWait, pSpeed, aIncrement) {
		this.cost = cost;
		this.pulse = function(){};
		this.pulse.wait = pWait;
		this.pulse.speed = pSpeed;
		this.pulse.ageIncrement = aIncrement;
	};
	window.red = new Stats(100, 1000, 150, 1);
	window.yellow = new Stats(175, 2000, 450, 1);
	window.green = new Stats(100, 5000, 750, 1);
	window.aqua = new Stats(175, 3500, 425, 1);
	window.blue = new Stats(100, 2000, 100, 1);
	window.purple = new Stats(175, 1500, 150, 1);
	
	window.white = new Stats(0, 0, 0, 1);
	
	
	window.uuidList = [];
	
	//Turns a "colour code" or a hexadecimal colour code or a file name into a hexadecimal colour code (adds a hash and removes .png)
	String.prototype.hexcode = function () {
		return "#" + (this.substring(this.length - 4) == ".png" ? this.substring(this.length - 10, this.length - 4) : this.substring(this.length - 6));
	};
	//Turns a "colour code" or a hexadecimal colour code or a file name into a "colour code" (removes a hash and .png)
	String.prototype.colCode = function () {
		return this.substring(this.length - 4) == ".png" ? this.substring(this.length - 10, this.length - 4) : this.substring(this.length - 6);
	};
	//Returns the brightest form of 'this' (where 'this' is a "colour code" or hexadecimal colour code)
	String.prototype.colOrigin = function () {
		return this.replace(/4/g, "8").replace(/8/g, "C").replace(/C0/g, "FF");
	};
	
	window.getElementById = document.getElementById;
	window.getId = getElementById;
	
	
	window.Square = function (colour, xLocation, yLocation, uuid) {
		this.colour = colour.colCode();
		this.x = xLocation;
		this.y = yLocation;
		this.uuid = uuid;
		this.age = 0;
		this.active = false;
		this.activeTemp;
	};
	Square.prototype.getLocation = function () {
		return [this.x, this.y];
	};
	Square.prototype.getColour = function () {
		return this.colour.hexcode();
	};
	Square.prototype.setColour = function (colour) {
		this.colour = colour.colCode();
	};
	Square.prototype.setAge = function (age) {
		this.age = age;
	};
	Square.prototype.addAge = function (amount) {
		this.age += amount;
	};
	Square.prototype.removeAge = function (amount) {
		this.age -= amount;
	};
	Square.prototype.activate = function () {
		this.active = true;
	};
	//'Destroys' the square, reverting it back to a blank black square. 'clear' (boolean) sets the image to black.
	Square.prototype.destroy = function (clear) {
		this.setColour("#000000");
		this.setAge(0);
		this.active = false;
		clearInterval(this.activeTemp);
		if (!clear) { searchFor.elementFrom.uuid(this.uuid).src = "000000.png"; }
	};
	Square.prototype.pulseWait = function () {
		if (this.colour.colOrigin() == "FF0000") {
			return red.pulse.wait;
		} else if (this.colour.colOrigin() == "FFFF00") {
			return yellow.pulse.wait;
		} else if (this.colour.colOrigin() == "00FF00") {
			return green.pulse.wait;
		} else if (this.colour.colOrigin() == "00FFFF") {
			return aqua.pulse.wait;
		} else if (this.colou.colOrigin() == "0000FF") {
			return blue.pulse.wait;
		} else if (this.colour.colOrigin() == "FF00FF") {
			return purple.pulse.wait;
		}else if (this.colour.colOrigin() == "FFFFFF") {
			return white.pulse.wait;
		}
		return false;
	};
	Square.prototype.pulseSpeed = function () {
		if (this.colour.colOrigin() == "FF0000") {
			return red.pulse.speed;
		} else if (this.colour.colOrigin() == "FFFF00") {
			return yellow.pulse.speed;
		} else if (this.colour.colOrigin() == "00FF00") {
			return green.pulse.speed;
		} else if (this.colour.colOrigin() == "00FFFF") {
			return aqua.pulse.speed;
		} else if (this.colour.colOrigin() == "0000FF") {
			return blue.pulse.speed;
		} else if (this.colour.colOrigin() == "FF00FF") {
			return purple.pulse.speed;
		} else if (this.colour.colOrigin() == "FFFFFF") {
			return white.pulse.speed;
		}
		return false;
	};
	Square.prototype.ageIncrement = function () {
		if (this.colour.colOrigin() == "FF0000") {
			return red.pulse.ageIncrement;
		} else if (this.colour.colOrigin() == "FFFF00") {
			return yellow.pulse.ageIncrement;
		} else if (this.colour.colOrigin() == "00FF00") {
			return green.pulse.ageIncrement;
		} else if (this.colour.colOrigin() == "00FFFF") {
			return aqua.pulse.ageIncrement;
		} else if (this.colour.colOrigin() == "0000FF") {
			return blue.pulse.ageIncrement;
		} else if (this.colour.colOrigin() == "FF00FF") {
			return purple.pulse.ageIncrement;
		} else if (this.colour.colOrigin() == "FFFFFF") {
			return white.pulse.ageIncrement;
		}
		return false;
	};
	
	window.get = function(){};
	
	get.prototype.colourFrom = function(){};
	get.prototype.colourFrom.location = function (location) {
		for (var z = 1; z < uuidList.length; z++) {
			if (eval(uuidList[z] + ".getLocation()")[0] == location[0] && eval(uuidList[z] + ".getLocation()")[1] == location[1]) { return eval(uuidList[z] + ".colour"); }
		}
		return false;
	};
	get.prototype.colourFrom.uuid = function (uuid) {
		return eval(uuid + ".colour");
	};
	
	get.prototype.locationFrom = function(){};
	get.prototype.locationFrom.colour = function (colour) {
		for (var z = 1; z < uuidList.length; z++) {
			if (eval(uuidList[z] + ".getColour()") == colour.hexcode()) { return eval(uuidList[z] + ".location"); }
		}
		return false;
	};
	get.prototype.locationFrom.uuid = function (uuid) {
		return eval(uuid + ".getLocation()");
	};
	
	get.prototype.uuidFrom = function(){};
	get.prototype.uuidFrom.colour = function (colour) {
		for (var z = 1; z < uuidList.length; z++) {
			if (eval(uuidList[z] + ".getColour()") == colour.hexcode()) { return uuidList[z]; }
		}
		return false;
	};
	get.prototype.uuidFrom.location = function (location) {
		for (var z = 1; z < uuidList.length; z++) {
			if (eval(uuidList[z] + ".getLocation()")[0] == location[0] && eval(uuidList[z] + ".getLocation()")[1] == location[1]) { return uuidList[z]; }
		}
		return false;
	};
	get.prototype.uuidFrom.element = function (e) {
		var a, b;
		if (e.id.charAt(2) > -1) {
			a = e.id.substr(1, 2);
			if (e.id.charAt(5) > -1) { b = e.id.substr(4, 2); } else { b = e.id.charAt(4); }
		} else {
			a = e.id.charAt(1);
			if (e.id.charAt(4) > -1) { b = e.id.substr(3, 2); } else { b = e.id.charAt(3); }
		}
		return uuidList[dn*(parseInt(a) - 1) + parseInt(b)];
	};
	
	get.prototype.elementFrom = function(){};
	get.prototype.elementFrom.uuid = function (uuid) {
		var uuidi = uuidList.indexOf(uuid);
		var uuidl = (uuidi - 1) % rn + 1;
		return document.getElementById("r" + ((uuidi - uuidl) / rn + 1) + "d" + uuidl + "p");
	};
	
	window.searchFor = new get();
	
	
	
	window.change = function (e) {
		if (e.src.substring(e.src.length - 10) == "000000.png" && (e.src.substring(e.src.length - 10) == "FFFFFF.png" ? true : points >= ccos)) {
			e.src = csec.src;
			var uuid = searchFor.uuidFrom.element(e);
			if (uuid) {
				eval(uuid + ".setColour('" + e.src.colCode() + "')");
				if (e.src.hexcode() != "#FFFFFF") {
					points -= ccos;
					eval(uuid + ".activate()");
					eval(uuid + ".activeTemp = setInterval('pulse(\\'" + uuid + "\\')', " + uuid + ".pulseWait())");
				}
			} else {
				console.warn("Element (" + e + ") to UUID (" + uuid + ") conversion invalid");
			}
		}
	};
	
	window.create = function (uuid, hostUuid, originUuid) {
		if(!originUuid) { originUuid = hostUuid; }
		if (uuid) {
			if (eval(uuid + ".getColour()") == "#000000") {
				var destroyed = false;
//				alert(eval(uuid + ".age") + ", " + eval(hostUuid + ".age") + ", " + eval(originUuid + ".age") + ", " + eval(originUuid + ".ageIncrement()"));
				eval(uuid + ".addAge(" + originUuid + ".ageIncrement() + " + hostUuid + ".age)");
				if (eval(uuid + ".age") <= 1) {
					eval(uuid + ".setColour('" + darken(eval(originUuid + ".getColour()")) + "')");
				} else if (eval(uuid + ".age") <= 2) {
					eval(uuid + ".setColour('" + darken(darken(eval(originUuid + ".getColour()"))) + "')");
				} else if (eval(uuid + ".age") <= 3) {
					eval(uuid + ".setColour('" + darken(darken(darken(eval(originUuid + ".getColour()")))) + "')");
				} else {
					destroy(uuid);
					destroyed = true;
				}
				eval("searchFor.elementFrom.uuid('" + uuid + "').src = " + uuid + ".getColour().colCode() + '.png'");
				if (!destroyed) { setTimeout("create(searchFor.uuidFrom.location([2 * searchFor.locationFrom.uuid('" + uuid + "')[0] - searchFor.locationFrom.uuid('" + hostUuid + "')[0], 2 * searchFor.locationFrom.uuid('" + uuid + "')[1] - searchFor.locationFrom.uuid('" + hostUuid + "')[1]]), '" + uuid + "', '" + originUuid + "'); " + uuid + ".destroy()", eval(originUuid + ".pulseSpeed()")); }
			} else if (eval(uuid + ".getColour().colOrigin()") == "#FFFFFF") {
				eval(uuid + ".addAge(" + uuid + ".ageIncrement())");
				if (eval(uuid + ".age") <= 1) {
					eval(uuid + ".setColour('#C0C0C0')");
				} else if (eval(uuid + ".age") <= 2) {
					eval(uuid + ".setColour('#808080')");
				} else if (eval(uuid + ".age") <= 3) {
					eval(uuid + ".setColour('#404040')");
				} else {
					destroy(uuid);
					points += 25;
				}
				eval("searchFor.elementFrom.uuid('" + uuid + "').src = " + uuid + ".getColour().colCode() + '.png'");
			}
		}
	};
	
	window.darken = function (colour) {
		return colour.replace(/8/g, "4").replace(/C/g, "8").replace(/FF/g, "C0");
	};
	
	window.lighten = function (colour) {
		return colour.replace(/C0/g, "FF").replace(/8/g, "C").replace(/4/g, "8");
	};
	
	window.destroy = function (uuid) {
		eval(uuid + ".destroy(true)");
	};
	
	window.pulse = function (uuid) {
		var loc = searchFor.locationFrom.uuid(uuid);
		create(searchFor.uuidFrom.location([loc[0] + 1, loc[1]]), uuid);
		create(searchFor.uuidFrom.location([loc[0] - 1, loc[1]]), uuid);
		create(searchFor.uuidFrom.location([loc[0], loc[1] + 1]), uuid);
		create(searchFor.uuidFrom.location([loc[0], loc[1] - 1]), uuid);
		create(searchFor.uuidFrom.location([loc[0] + 1, loc[1] + 1]), uuid);
		create(searchFor.uuidFrom.location([loc[0] + 1, loc[1] - 1]), uuid);
		create(searchFor.uuidFrom.location([loc[0] - 1, loc[1] + 1]), uuid);
		create(searchFor.uuidFrom.location([loc[0] - 1, loc[1] - 1]), uuid);
	};
	
	window.setSelected = function (e) {
		csec.src = e.src;
		if (e.id == "FF0000p") {
			ccos = 100;
		} else if (e.id == "FFFF00p") {
			ccos = 175;
		} else if (e.id == "00FF00p") {
			ccos = 100;
		} else if (e.id == "00FFFFp") {
			ccos = 175;
		} else if (e.id == "0000FFp") {
			ccos = 100;
		} else if (e.id == "FF00FFp") {
			ccos = 175;
		}
	};
	
	window.resize = function (width, height, bgcol) {
		tmain.innerHTML = "";
		document.title = "Li Art II - 0%";
		for (var r = 1; r <= height; r++) {
			tmain.innerHTML = tmain.innerHTML.substring(0, tmain.innerHTML.length - 8) + "<tr id='r" + r + "'></tr>";
			for (var d = 1; d <= width; d++) {
				tmain.innerHTML = tmain.innerHTML.substring(0, tmain.innerHTML.length - 13) + "<td id='r" + r + "d" + d + "' style='mouse: pointer'><img id='r" + r + "d" + d + "p' src='" + bgcol.colCode() + ".png' onclick='change(this)' style='width: " + wp + "px; height " + hp + "px'></td>";
				uuidList[dn*(r - 1) + d] = "u" + (dn*(r - 1) + d); //u(dn*(r-1)+d) needs to become UUID
				eval("window." + uuidList[dn*(r - 1) + d].toString() +
					 " = new Square('#000000', " + d + ", " + r + ", '" + uuidList[dn*(r - 1) + d].toString() + "')");
				document.title = "Li Art II - " + parseInt(((r - 1) * dn + d) / (rn * dn) * 100) + "%";
			}
		}
		document.title = "Li Art II - Please Wait";
		setInterval("if (points != prevPoints) { document.title = 'Li Art II - ' + points + ' points'; prevPoints = points; }", 100);
	};
	
	
	function onLoad() {
		resize(dn, rn, "#000000");
//		setTimeout("setInterval('', 6000)", 15000); // Randomly generate white squares
	}
	onLoad();
	
	/*} else {
		if (alert) { alert("Error: This browser does not support the content of this page. Please update or use a different browser."); }
		if (error) { error("Error: This browser does not support the content of this page. Please update or use a different browser."); }
		if (document.body.innerHTML) { document.body.innerHTML = ""; }
		if (setTimeout) { setTimeout("document.body.innerHTML = ''", 250); }
	}*/
}
