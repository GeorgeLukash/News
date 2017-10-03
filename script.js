window.onload = function() {

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        url: proxy + "https://www.ukr.net/ajax/start.json",
        //url: proxy + "https://newsapi.org/v1/articles?source=techcrunch&apiKey=57b17d6a88f74e0d9707e756f2fa3fdc",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',

        crossDomain: true,
        //beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
        beforeSend: function(request) {
            request.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
        success: function(data) {
            var main = document.getElementById('main');
            for (var i = 0; i < data.news.length; i++) {
                if (data.news[i].items != null) {

                    var h1 = document.createElement('H1');
                    var container = document.createElement('div');

                    container.className = "container";
                    h1.innerHTML = data.news[i].title;
                    h1.className = "news-title";
                    container.appendChild(h1);

                    var link_more = document.createElement('A');
                    link_more.innerHTML = data.news[i].readMore;
                    container.appendChild(link_more);

                    if (data.news[i].items != null) {
                        var list = document.createElement('UL');

                        for (var j = 0; j < data.news[i].items.length; j++) {

                            var li = document.createElement('LI');
                            var link = document.createElement('a');

                            link.setAttribute("href", data.news[i].items[j].url);
                            link.className = "link";
                            link.innerHTML = data.news[i].items[j].title;
                            li.innerHTML = data.news[i].items[j].date + ":";
                            li.appendChild(link);
                            list.appendChild(li);
                            container.appendChild(list);
                            main.appendChild(container);

                        }
                    }
                }
            }

            console.log(data);
        }
    });
};