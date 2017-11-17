function statusChangeCallback(response) {
    if (response.status === 'connected') {
      // console.log('INI RESPONE LOG',response);
      axios.post('http://localhost:3000/facebook',{}, {headers: {token:response.authResponse.accessToken , id: response.authResponse.userID}})
      .then(function (rsp) {
        localStorage.setItem('jwtTokenApp',rsp.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId: 1545889175503252,
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v2.11';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
