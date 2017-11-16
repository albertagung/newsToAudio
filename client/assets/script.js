$(document).ready(function() {
	var endpointNews = "http://localhost:3000/api/news";
	var endpointPocket = "http://localhost:3000/api/pocket";
	const loadingArea = $('#loading');
	const contentArea = $('#content-area');
	const searchQuery = $("#searchQuery");
	const btnLoadmore = $('#btnLoadmore');
	const pocketToken = "a1109626-b5fa-e1d8-703f-676217";

	function initAppReader() {
		$('.less').hide();

		$('.news-content').each(function(){ 
			$(this).find('p:not(:first)').hide()
		});

		$('.more').on('click', function(){
			$(this).next().show();
			$(this).hide().closest('.news-content').find('p').show();    
		})

		$('.less').on('click', function(){
			$(this).prev().show();
			$('.news-content').find('p:not(:first)').hide()  
			$(this).hide()
		})

		$(".savePocket").on('click', function() {
			$.ajax({
				dataType: "json",
				data: {
					'url' : $(this).data('url'),				
				},
				method: "POST",
				url: endpointPocket,
				beforeSend: function (xhr){
					console.log('Saving to Pocket...')
				},
				success: function (results) {
					alert('Article Saved to Pocket');
					console.log(results);
				},
				error: function(err) {
					alert("Error saving to Pocket");
				}
			});
		})
	}

	function stripHtml(html){
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}

	function getArticles() {
		console.log('~~~ Get Articles')
		$.ajax({
			method: "GET",
			url: endpointNews,
			beforeSend: function (xhr){
				contentArea.html("");
				loadingArea.show();
			},
			success: function (results) {
				contentArea.html(crunchArticle(results));
				initAppReader();
				loadingArea.hide();
			},
			error: function(err) {
				loadingArea.hide();
				alert("Error fetching data");
			}
		})
	}

	function crunchArticle(results) {
		let content = '';

		results.forEach( function(article, index) {
			content += `
				<div class="card-panel grey lighten-5 z-depth-1">
					<div class="row valign-wrapper">
						<div class="col s12">
							<img src="${article._embedded['wp:featuredmedia'][0].source_url}" alt="featured-image" class="responsive-img avatar-pic"> <!-- notice the "circle" class -->
						</div>
					</div>

					<div class="row valign-wrapper">
						<div class="col s12">
							<h5 class="card-title">${article.title.rendered}</h5>
							<div class="news-content">
								${article.content.rendered}

								<div class="waves-effect waves-light btn more">More...</div>
								<div class="waves-effect waves-light btn less">Less...</div>
								<div class="waves-effect waves-light btn readText">Spell It</div>
								<div class="waves-effect waves-light btn savePocket" data-url="${article.link}">Save It</div>
							</div><!-- /.news-content -->
						</div>
					</div>
				</div>
			`;
		});

		return content;
	}


	getArticles();
	initAppReader();
})