function checkAvailablity() {


	var urlHit = '/checkAvailablity';

	$.ajax({
		type: "GET",
		url: urlHit,
		async: false,
		dataType: 'json',

		success: function (response) {
			//alert(data);
			var dates = response;
			console.log(dates);
			if (dates.length == 0 || typeof (dates) == undefined || !dates) {

				alert("rooms avaianlae");
			}



			var chkInDate = [];
			var chkOutDate = [];


			for (let i in dates) {
				dates[i].CheckIn_Date = new Date(dates[i].CheckIn_Date);

				for (let z = 1; z <= dates[i].NumberOfRooms; z++) {
					chkInDate.push(parseInt((dates[i].CheckIn_Date) / (1000 * 3600 * 24)));
				}

			}

			for (let j in dates) {
				dates[j].CheckOut_Date = new Date(dates[j].CheckOut_Date);

				for (let z = 1; z <= dates[j].NumberOfRooms; z++) {
					chkOutDate.push(parseInt((dates[j].CheckOut_Date) / (1000 * 3600 * 24)));
				}

			}




			chkInDate.sort(function (a, b) { return a - b; });
			chkOutDate.sort(function (a, b) { return a - b; });
			alert(chkInDate);
			alert(chkOutDate);
			var res = $("#noOfRooms").val();


			var arrDate = $("#chkInDate").val();
			var finalArrDate = parseInt((new Date(arrDate)) / (1000 * 3600 * 24));



			if (finalArrDate >= chkOutDate[chkOutDate.length - 1]) {
				alert("rooms are avaiable");
			}
			else {
				var k = 7;
				var n = chkInDate.length;
				var max = 1;
				var o = 1, p = 0;

				while (o < n && p < n) {
					if (chkInDate[o] < chkOutDate[p]) {
						++res;
						if (res > max) {
							max = res;
						}
						++o;
					}
					else {
						--res;
						++p;
					}
				}

				alert(k >= max);
				alert(k - max);


			}
			if ((k >= max) || (finalArrDate >= chkOutDate[chkOutDate.length - 1]) || (dates.length == 0 || typeof (dates) == undefined || !dates)) {


				swal({
					title: "Rooms are available !",
					text: "Click book now to move further",
					icon: "info",
					button: "ok",
				});



				$("#bookBtn").prop('disabled', false);
				$(".form-control").change(function () {
					$("#bookBtn").prop('disabled', true);
				});
			}
			else {

				swal({
					title: "Rooms are NOT available !",
					text: "Please Check for some other day ",
					icon: "info",
					button: "ok",
				}).then(function () {
					window.location = "/index.html";
				});
			}


			var bookingIdTime = new Date();
			var bookingIdTimeInMs = bookingIdTime.getTime();
			$("#bookingId").val(bookingIdTimeInMs);

		}
	});
}
