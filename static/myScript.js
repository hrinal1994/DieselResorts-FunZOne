/* var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
 */








//setInterval(next,5000);
/* function next(){
	
	var slider = document.getElementById("slider");
	num++;
	if(num >=images.length){num=0;}
	
	slider.src=images[num];
	
	
} */

var images=["static/img1.jpg","static/img2.jpg","static/img3.jpg","static/img4.jpg","static/img5.jpg","static/img6.jpg","static/img7.jpg","static/img8.jpg"];
var num=0;
var temp=0;

function plusSlides(){

	var slider = document.getElementById("slider");
	num++;
	if(num >=images.length){num=0;
	temp=0;}
	
	slider.src=images[num];
	temp+=num;
	
}

function MinusSlides(){

	var slider = document.getElementById("slider");
	temp--;
	if(temp <0){temp=images.length-1;}
	if(temp >=images.length){temp=0;}
	slider.src=images[temp];
	
} 



$(document).ready(function () {
	var $window = $(window);

	// Function to handle changes to style classes based on window width
	function checkWidth() {

		if ($window.width() >= 768) {
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	}

	// Execute on load
	checkWidth();

	// Bind event listener
	$(window).resize(checkWidth);
});   


 

function deleteUser(x) {
	alert(x);
	var urlHit = '/del/' + x;
	
	$.ajax({
		type: "DELETE",
		url: urlHit,
	    success: render(),
		
	});

	function render(response) {
		alert("Data of " + x + "deleted");
		//window.history.back()
		//alert(response.html());
		//location.reload();
		$("#renderHere").html(response);
	}
}



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




			chkInDate.sort(function (a, b) { return a - b });
			chkOutDate.sort(function (a, b) { return a - b });
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
				var max =1;
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
				})



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








